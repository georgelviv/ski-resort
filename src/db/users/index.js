const { readDB, writeDB } = require('db/utils');
const User = require('./user-model');

const collectionName = 'users';
let usersCollection;

async function read(dist, id) {
  try {
    usersCollection = await readDB(dist, collectionName);
  } catch (e) {
    console.log('Error to read users', e);
    throw e;
  }

  if (id) {
    return usersCollection.find((user) => {
      return Number(user.id) === Number(id);
    });
  }

  return usersCollection;
}

async function create(dist, userData) {
  let user;
  try {
    usersCollection = await read(dist);

    user = new User({
      name: userData.name
    });

    usersCollection.push(user);

    await writeDB(dist, collectionName, usersCollection);
  } catch (e) {
    console.log('Error to create user', e);
    throw e;
  }

  return user;
}

async function update(dist, id, userData) {
  let updatedUser;
  try {
    usersCollection = await read(dist);

    usersCollection = usersCollection.map((user) => {
      if (user.id === id) {
        updatedUser = new User({ ...user, ...userData });

        return updatedUser;
      }
      return user;
    });

    if (updatedUser) {
      await writeDB(dist, collectionName, usersCollection);
    }
  } catch (e) {
    console.log('Error to update user', e);
    throw e;
  }

  return updatedUser;
}

function users(dist) {
  return {
    read: read.bind(null, dist),
    create: create.bind(null, dist),
    update: update.bind(null, dist)
  };
}


module.exports = users;
