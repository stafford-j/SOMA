// models/User.js

const bcrypt = require("bcryptjs");

class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Hash password before saving
  async setPassword(password) {
    this.password = await bcrypt.hash(password, 10);
  }

  // Compare input password with stored password
  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

module.exports = User;
