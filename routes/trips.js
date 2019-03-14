const Trips = {
  _trips: null,

  set trips(model) {
    this._trips = model;
  },

  async tripEndpoint(request, response) {
    const { body: { name } } = request;

    try {
      await this._trips.insertOne({ name });
      response.status(200).json({ ok: true });
    } catch (error) {
      response.status(500).json({ error });
    }
  },

  async tripsEndpoint(request, response) {
    try {
      const tripsList = await this._trips.find().toArray();
      response.status(200).json({ trips: tripsList });
    } catch (error) {
      response.status(500).json({ error });
    }
  }
};

module.exports = { Trips };
