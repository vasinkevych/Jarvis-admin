export const parseCarsModels = carsData => {
  return carsData
    .reduce((acc, car) => {
      let brand = car.brand.split(' ')[0].toLowerCase();

      if (brand === 'vw' || brand === 'wolksvagen' || brand === 'wv')
        brand = 'volkswagen';

      if (brand === 'ваз') brand = 'vaz';

      if (brand === 'hyundaii30' || brand === 'tucson' || brand === 'hyndai')
        brand = 'hyundai';

      if (brand === 'qashkai') brand = 'nissan';

      const existingBrand = acc.find(item => item.brand === brand);
      if (existingBrand) {
        existingBrand.quantity += 1;
      } else {
        acc.push({
          brand,
          quantity: 1
        });
      }
      return acc;
    }, [])
    .sort((a, b) => b.quantity - a.quantity);
};
