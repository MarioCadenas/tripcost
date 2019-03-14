const Expenses = {
  _expenses: null,

  set expenses(model) {
    this._expenses = model;
  },

  async expenseEndpoint(request, response) {
    try {
      const { body: { trip, date, amount, category, description } } = request;

      await this._expenses.insertOne({ trip, date, amount, category, description });
      response.status(200).json({ ok: true });
    } catch (error) {
      response.status(500).json({ error });
    }
  },

  async expensesEndpoint(request, response) {
    try {
      const { body: { trip } } = request;
      const expensesList = await this._expenses.find({ trip }).toArray();

      response.status(200).json({ expenses: expensesList });
    } catch (error) {
      response.status(500).json({ error });
    }
  }
};

module.exports = { Expenses };
