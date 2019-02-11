const setupDBFile = require('./setup-db-file');
const { users, userSchema } = require('./users');

function initDB(dist) {
  return new Promise((resolve, reject) => {
    setupDBFile(dist)
      .then(() => {
        resolve({
          users: users(dist)
        });
      }).catch(reject);
  });
}

module.exports = {
  initDB,
  userSchema
};
