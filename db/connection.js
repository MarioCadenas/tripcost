const { MongoClient } = require('mongodb');
const { Trips } = require('../routes/trips');
const { Expenses } = require('../routes/expenses');
const { Users } = require('../routes/users');

const url = 'mongodb://localhost:27017';
const DATABASE_NAME = 'tripcost';

const connect = async () => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(DATABASE_NAME);
    Trips.trips = db.collection('trips');
    Expenses.expenses = db.collection('expenses');
    Users.users = db.collection('users');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };
