const config = require('../configs/index');
const axios = require('axios');

module.exports = {
  async getCarBotIds({ carNumber }) {
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

    const carRegistrations = await Promise.all(
      carsIdList.map(item => {
        const botIdURL = encodeURI(
          `https://opendatabot.com/api/v2/transport/${item.id}?apiKey=${
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
