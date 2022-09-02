const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');

const UserService = require('./userService');
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    delete req.user.dataValues.password;
    res.json({
      user: user,
      token,
    });
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    console.log('-------------------------------------------------');
    console.log(user);
    if (!user) {
      throw boom.unauthorized();
    }
    console.log('emailUser', config.email);
    const payload = {sub: user.id};
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: config.smtpEmail, // sender address
      to: `${user.dataValues.email}`, // list of receivers
      subject: 'Recovery password email', // Subject line
      html: `<b>Go to this link => ${link} </b>`, // html body
    }
    const rta = await this.sendMmail(mail);
    return rta;
  }

  async sendMmail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: `${ config.smtpEmail }`,
        pass: `${config.smtpPassword}`,
      },
    });
    await transporter.sendMail(infoMail);
    return {message: 'mail sent'};
  }
}

module.exports = AuthService;
