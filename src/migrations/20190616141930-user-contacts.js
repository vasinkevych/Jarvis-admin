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
  db.createTable('user_contacts', {
    id: { type: 'int', length: 11, primaryKey: true, autoIncrement: true, notNull: true},
    user_id: {
      type: 'varchar',
      length: 11,
      notNull: true,
    },
    type: {
      type: 'varchar',
      length: 1,
      notNull: true,
    },
    value: {type: 'text'},
  }, cb);
};

exports.down = function(db, cb) {
  db.dropTable('user_contacts', cb);
};

exports._meta = {
  "version": 1
};
