'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, cb) {
  db.createTable('users', {
    id: { type: 'int', length: 11, primaryKey: true, autoIncrement: true, notNull: true},
    name: {type: 'varchar', length: 63, notNull:true}
  }, cb);
};

exports.down = function(db, cb) {
  db.dropTable('users', cb);
};
exports._meta = {
  "version": 1
};
