const findCar = (scans, cars) => {
  const carsMatches = scans.reduce((acc, { text }) => {
    const match = cars.filter(car => car.number.includes(text));
    return [...acc, ...match];
  }, []);

  return carsMatches[0];
};

module.exports = findCar;
