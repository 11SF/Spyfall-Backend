const repository = require("../repository/location.repository");
const { InternalError } = require("../utility/error");

async function find(findLocationObject) {
  let result;
  try {
    result = await repository.find(findLocationObject);
    if (result.length === 0) {
      return new DataNotFound(
        "Player id: '" + findLocationObject.id + "' id not found"
      );
    }
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

async function create(locationObject) {
  let result;
  try {
    locationObject.model.createDate = new Date();
    result = await repository.create(locationObject);
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

async function update(locationObject) {
  let result;
  try {
    locationObject.model.updateDate = new Date();
    console.log(locationObject);
    result = await repository.update(locationObject);
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

async function remove(locationObject) {
  let result;
  try {
    result = await repository.remove(locationObject);
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

module.exports = { find, create, update, remove };
