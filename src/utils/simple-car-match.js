const Fuse = require('fuse.js');

const searchOptions = {
  id: 'id',
  shouldSort: true,
  // includeScore: true,
  threshold: 0.5,
  location: 0,
  distance: 1000,
  maxPatternLength: 16,
  minMatchCharLength: 6,
  keys: ['number']
};

const findCar = (scans, cars) => {
  const scan = scans.map(({ text }) => text).join(' ');
  const fuse = new Fuse(cars, searchOptions);
  const matches = fuse.search(scan);

  return (matches && matches[0]) || null;
};

module.exports = findCar;
