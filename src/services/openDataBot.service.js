const config = require('../configs/index');
const axios = require('axios');
const { OPEN_DATA_BOT_ENDPOINT } = require('./constant.service');

module.exports = {
  async getCarBotIds({ carNumber }) {
    const botURL = encodeURI(
      `${OPEN_DATA_BOT_ENDPOINT}/transport?apiKey=${
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

    const carRegistrations = await Promise.all(
      carsIdList.map(item => {
        const botIdURL = encodeURI(
          `${OPEN_DATA_BOT_ENDPOINT}/transport/${item.id}?apiKey=${
            config.OPENDATABOT_API_KEY
          }`
        );
        return axios({
          method: 'get',
          url: botIdURL,
          responseType: 'application/json'
        });
      })
    )
      .then(resArray => resArray.map(res => res.data))
      .catch(e => console.error(e));

    // TODO define result type
    if (carRegistrations.length) {
      return carRegistrations;
    }
    return null;
  }
};
