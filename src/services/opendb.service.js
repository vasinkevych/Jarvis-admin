const config = require('../configs/index');
const axios = require('axios');

module.exports = {
  async getCarBotIds(carNumber) {
    const botURL = encodeURI(
      `https://opendatabot.com/api/v2/transport?apiKey=${
        config.OPENDATABOT_API_KEY
      }&number=${carNumber}`
    );
    const carsInDatabase = await axios({
      method: 'get',
      url: botURL,
      responseType: 'application/json'
    });

    return carsInDatabase.data.data;
  },

  async getCarRegistrations() {
    const carsIds = await this.getCarRegistrations();
  }
};
