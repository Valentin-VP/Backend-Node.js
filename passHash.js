const bcrypt = require('bcrypt');

async function hashPassword() {
  const myPassword = 'admin .013';
  const hash = '$2b$10$54cLXp01ZtLVb2gasH7iVuMa5c4Zoh9B1cIfRW722IMe5E.gI1/I2';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

hashPassword();
