'use strict';

let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, cb) {
  let sql = 'ALTER TABLE cars CONVERT TO CHARACTER SET utf8;';
  db.runSql(sql, cb);
};

exports.down = function(db, cb) {
  return cb();
};

exports._meta = {
  "version": 1
};
