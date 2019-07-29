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
  db.createTable('cars', {
    id: { type: 'int', length: 11, primaryKey: true, autoIncrement: true, notNull: true},
    number: {type: 'varchar', length: 63, notNull:true},
    brand: {type: 'varchar', length: 63, notNull:true},
  }, cb);
};

exports.down = function(db, cb) {
  db.dropTable('cars', cb);
};

exports._meta = {
  "version": 1
};
