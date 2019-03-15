const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');

const SECRET = '1234abc';

const Users = {
  _users: null,

  set users(model) {
    this._users = model;
  },

  async createUserEndpoint(request, response) {
    try {
      const { body: { email, password: notSecurePassword } } = request;
      const [userExists] = await this._users.find({ email }).toArray();

      if (userExists) {
        return response.status(400).json({ message: `User with email ${email} already exists!` });
      }

      const password = saltPassword(notSecurePassword);
      const _id = new ObjectID().toHexString();
      const access = 'auth';
      const token = jwt
        .sign({ _id, access }, process.env.JWT_SECRET || SECRET)
        .toString();

      await this._users.insertOne({ _id, email, password, tokens: [token] });

      return response.send({ token });
    } catch (error) {
      return response.status(500).json({ error });
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
