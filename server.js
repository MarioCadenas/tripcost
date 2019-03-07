const express = require('express');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const DATABASE_NAME = 'tripcost';
let trips, expenses;

MongoClient
  .connect(url)
  .then((client) => {
    const db = client.db(DATABASE_NAME);
    trips = db.collection('trips');
    expenses = db.collection('expenses');
  })
  .catch(err => console.log(err));

const app = express();

const tripEndpoint = async (request, response) => {
  const { body: { name } } = request;

  try {
    await trips.insertOne({ name });
    response.status(200).json({ ok: true });
  } catch (error) {
    response.status(500).json({ error });
  }
};

const tripsEndpoint = async (request, response) => {
  try {
    const tripsList = await trips.find().toArray();
    response.status(200).json({ trips: tripsList });
  } catch (error) {
    response.status(500).json({ error });
  }
};

const expenseEndpoint = async (request, response) => {
  try {
    const { body: { trip, date, amount, category, description } } = request;

    await expenses.insertOne({ trip, date, amount, category, description });
    response.status(200).json({ ok: true });
  } catch (error) {
    response.status(500).json({ error });
  }
};

const expensesEndpoint = async (request, response) => {
  try {
    const { body: { trip } } = request;
    const expensesList = await expenses.find({ trip }).toArray();

    response.status(200).json({ expenses: expensesList });
  } catch (error) {
    response.status(500).json({ error });
  }
};

app.use(express.json());
app.post('/trip', tripEndpoint);
app.get('/trips', tripsEndpoint);
app.post('/expense', expenseEndpoint);
app.get('/expenses', expensesEndpoint);

app.listen(3000, () => console.log('Server up!'));
