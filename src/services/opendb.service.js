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

  async getCarRegistrations(carNumber) {
    const carsIdList = await this.getCarBotIds(carNumber);
    const carRegistrations = [];

    for (let i = 0; i < carsIdList.length; i++) {
      let carObj = carsIdList[i];
      const botIdURL = encodeURI(
        `https://opendatabot.com/api/v2/transport/${carObj.id}?apiKey=${
          config.OPENDATABOT_API_KEY
        }`
      );
      const carInfo = await axios({
        method: 'get',
        url: botIdURL,
        responseType: 'application/json'
      });
      carRegistrations.push(carInfo.data);
    }

    // TODO define result type
    if (carRegistrations.length) return carRegistrations;
    return null;
  }
};
