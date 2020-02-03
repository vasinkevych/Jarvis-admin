'use strict';

let dbm;
let type;
let seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, cb) {
  db.createTable('users_cars', {
    id: { type: 'int', length: 11, primaryKey: true, autoIncrement: true, notNull: true },
    user_id: {
      type: 'varchar',
      length: 11,
      notNull: true,
    },
    car_id: {
      type: 'int',
      length: 11,
      notNull: true,
    },
  }, cb);
};

exports.down = function(db, cb) {
  db.dropTable('users_cars', cb);
};

exports._meta = {
  "version": 1
};
