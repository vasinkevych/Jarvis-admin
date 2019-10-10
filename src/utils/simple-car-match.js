require('array-flat-polyfill');
const Fuse = require('fuse.js');

const searchOptions = {
  id: 'id',
  shouldSort: true,
  includeScore: true,
  threshold: 0.5,
  location: 0,
  distance: 1000,
  maxPatternLength: 16,
  minMatchCharLength: 6,
  keys: ['number']
};

const findCar = (scans, cars) => {
  try {
    // find max length of searched text
    // we need it for inverting best matches
    const maxLength = Math.max(...scans.map(({ text }) => text.length));
    const fuse = new Fuse(cars, searchOptions);
    const map = new Map();

    scans
      .map(({ text }) =>
        fuse
          .search(text)
          .map(f => ({ ...f, text, length: maxLength - text.length }))
      )
      .flat()
      .forEach(match => map.set(match.item, match));

    return Array.from(map.values()).sort(
      (a, b) => a.score - b.score || a.length - b.length
    );
  } catch (e) {
    // a few bits tried to escape, but we caught them (by https://whatthecommit.com/)
    console.log(e);

    return null;
  }
};

module.exports = findCar;
