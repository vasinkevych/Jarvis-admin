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

  normalizeCarNumber(carNumbers) {
    const MAX_CAR_NUMBER_LENGTH = 11;
    // remove all special symbols for one car number
    carNumbers =
      carNumbers < MAX_CAR_NUMBER_LENGTH
        ? carNumbers.replace(/[^a-zA-Zа-яА-Я\d]+/g, '')
        : carNumbers
            .split(/;|,|\n/)
            .map(carNumber => carNumber.replace(/[^a-zA-Zа-яА-Я\d]+/g, ''));

    return carNumbers;
  }

  normalizeName(user, rawData, i) {
    if (user.trim().length < 1 && i > 0) {
      // get name from previous row when user cell is empty
      return rawData[i - 1][0].trim();
    }
    return user.trim();
  }

  normalizeRows(rawData) {
    return rawData.map((row, i) => {
      let [user, brand, carNumber, phones, room, internalPhone, skype] = row;
      return {
        user: this.normalizeName(user, rawData, i),
        brand: brand.trim() || null,
        carNumber: this.normalizeCarNumber(carNumber),
        phones: phones.trim() ? this.parsePhoneNumbers(phones) : [],
        room: room.trim() || null,
        internalPhone: internalPhone.trim() || null,
        skype: skype.trim() || null
      };
    });
  }
}

module.exports = ParseService;
