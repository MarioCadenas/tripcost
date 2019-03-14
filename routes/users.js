const jwt = require('jsonwebtoken');

const SECRET = '1234abc';

const Users = {
  _users: null,

  set users(model) {
    this._users = model;
  },

  async createUserEndpoint(request, response) {
    try {
      const { body: { email, password: notSecurePassword } } = request;
      const password = saltPassword(notSecurePassword);

      const user = await this._users.insertOne({ email, password, tokens: [] });
      const _id = user.insertedId.toHexString();

      const access = 'auth';
      const token = jwt
        .sign({ _id: user.insertedId.toHexString(), access }, process.env.JWT_SECRET || SECRET)
        .toString();

      this._users.save({ _id, tokens: [token] });

      response.send(token);
    } catch (error) {
      response.status(500).json({ error });
    }
  },

  async loginEndpoint(request, response) {
    try {
      console.log(request);
    } catch (error) {
      response.status(500).json({ error });
    }
  }
};

module.exports = { Users };

const saltPassword = (password) => {
  return password;
};
