class ParseService {
  parsePhoneNumbers(phones) {
    const COUNTRY_CODE_UA = '380';
    const PHONE_LENGTH = 9; // length of normalized phone like 971234567

    let phoneCell = phones
      .trim()
      .replace(/\D/g, '')
      .replace(/^380|^\+380|^80|^0+/, '');
    let index = 0;
    let normalizedPhone = '';
    let phonesArray = [];
    let length = phoneCell.length + 1;

    while (length) {
      if (normalizedPhone.length < PHONE_LENGTH) {
        normalizedPhone += phoneCell.charAt(index);
        index += 1;
        length -= 1;
      } else {
        phonesArray.push(COUNTRY_CODE_UA + normalizedPhone);
        normalizedPhone = '';
        phoneCell = phoneCell.substr(index).replace(/^380|^\+380|^80|^0/, '');
        index = 0;
        length = phoneCell.length + 1;
      }
    }

    return phonesArray;
  }

  normalizeCarNumber(carNumber) {
    // TODO create parse function
    return carNumber;
  }

  normalizeName(name) {
    return name.trim();
  }

  normalizeRows(rawData) {
    const MAX_CAR_NUMBER_LENGTH = 11;

    return rawData.map((row, i) => {
      let [user, brand, carNumber, phones, room, internalPhone, skype] = row;

      if (user.length < 1 && i > 0) {
        // get name from previous row when user cell is empty
        user = this.normalizeName(rawData[i - 1][0]);
      } else {
        user = this.normalizeName(user);
      }

      carNumber =
        carNumber > MAX_CAR_NUMBER_LENGTH
          ? this.normalizeCarNumber(carNumber)
          : carNumber;

      phones = phones ? this.parsePhoneNumbers(phones) : [];

      return {
        user,
        brand,
        carNumber,
        phones,
        room,
        internalPhone,
        skype
      };
    });
  }
}

module.exports = ParseService;
