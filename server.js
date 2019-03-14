const express = require('express');
const { connect} = require('./db/connection');
const { Trips } = require('./routes/trips');
const { Expenses } = require('./routes/expenses');
const { Users } = require('./routes/users');
const { authenticate } = require('./middleware');

connect();
const app = express();

app.use(express.json());
app.post('/trip', authenticate, Trips.tripEndpoint.bind(Trips));
app.get('/trips', authenticate, Trips.tripsEndpoint.bind(Trips));
app.post('/expense', authenticate, Expenses.expenseEndpoint.bind(Expenses));
app.get('/expenses', authenticate, Expenses.expensesEndpoint.bind(Expenses));
app.post('/users', Users.createUserEndpoint.bind(Users));
app.post('/users/login', authenticate, Users.loginEndpoint.bind(Users));

app.listen(3000, () => console.log('Server up!'));
