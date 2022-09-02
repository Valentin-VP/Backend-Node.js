const bcrypt = require('bcrypt');

async function hashPassword() {
  const myPassword = '12345678';
  // const hash = '$2b$10$54cLXp01ZtLVb2gasH7iVuMa5c4Zoh9B1cIfRW722IMe5E.gI1/I2';
  // const isMatch = await bcrypt.compare(myPassword, hash);
  // console.log(isMatch);
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();
