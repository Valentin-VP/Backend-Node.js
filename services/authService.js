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
    delete user.dataValues.password;
    // delete user.dataValues.recoveryToken;
    return {
      user: user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    // const link = `http://myfrontend.com/recovery?token=${token}`;
    const link = `token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.smtpEmail, // sender address
      to: `${user.dataValues.email}`, // list of receivers
      subject: 'Recovery password email', // Subject line
      html: `<b>Go to this link => ${link} </b>`, // html body
    };
    const rta = await this.sendMmail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      console.log(newPassword);
      const hash = await bcrypt.hash(newPassword, 10);
      const rta = await service.update(user.id, { password: hash, recoveryToken: null });
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMmail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: `${config.smtpEmail}`,
        pass: `${config.smtpPassword}`,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
