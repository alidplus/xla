const { Service } = require('../feathers-mongoose-extended');

exports.Events = class Events extends Service {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }

  async create(data, params) {
    if(Array.isArray(data)) {
      const results = []
      await data.reduce( async (p, d) => {
        if(p)
          await p;
        const res = await this.create(d, params)
        results.push(res)
        return res
      }, null)
      return results
    }
    try {
      const app = this.app;
      const MatchService = app.service("matches");
      const match = await MatchService.get(data.match);
      const timeUp = match.timeUp;

      const startTime = match.startTime;
      const now = new Date();
      const diff = now - startTime;

      if(diff < 0) {
        throw new Error("The match hasn't started yet")
      }
      else if(timeUp) {
        throw new Error("The match has finished")
      }

      const event = await super.create(data, params);

      return event;
    } catch(e) {
      console.log("eventCreation: " + e);
      throw new Error("failed to create event")
    }
  }
};

