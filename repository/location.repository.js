const locationRepo = require("../Model/location.model");
const { InternalError } = require("../utility/error");

async function find(req) {
  let result;
  try {
    let query = {};
    if (req.name) {
      query.name = req.name;
    }
    if(req.id) {
      query._id = req.id;
    }
    query.updateDate = {
      $ne: null,
    };
    result = await locationRepo.find(query);
  } catch (err) {
    return new InternalError(5030, err);
  }
  return result;
}

async function create(locationObject) {
  let result;
  try {
    const locations = await locationRepo.find();
    for (const location of locations) {
      if (location.name === locationObject.model.name) {
        return new InternalError(5033, "name is dupplicate");
      }
    }
    const newRecord = new locationRepo(locationObject.model);
    result = await newRecord.save();
  } catch (err) {
    return new InternalError(5030, err);
  }
  return result;
}

async function update(locationObject) {
  let result;
  try {
    result = await locationRepo.findByIdAndUpdate(
      { _id: locationObject.id },
      {
        $set: {
          roles: locationObject.model.roles,
          updateDate: new Date(),
        },
      }
    );
  } catch (err) {
    return new InternalError(5030, err);
  }
  return result;
}

async function remove(locationObject) {
  let result;
  console.log(locationObject.id);
  try {
    result = await locationRepo.findOneAndDelete({ _id: locationObject.id });
  } catch (err) {
    return new InternalError(5030, err);
  }
  return result;
}

module.exports = { find, create, update, remove };