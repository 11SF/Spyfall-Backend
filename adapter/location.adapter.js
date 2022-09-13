const { InvalidDataError } = require("../utility/error");

function mapRequestBodyLocationToModelObject(reqData) {
  const { id, name, roles, createBy, createByPlayerId } = reqData;
  // if (!name) {
  //   throw new InvalidDataError(
  //     5011,
  //     "Invalid data: field 'name' is require <name is a key>"
  //   );
  // }
  return {
    id: id ? id : null,
    model: {
      name: name,
      roles: mapRoles(roles),
      createBy: createBy ? createBy : "anonymous",
      createByPlayerId: createByPlayerId ? createByPlayerId : null,
      createDate: null,
      updateDate: null,
    },
  };
}

function mapRoles(roles) {
  let rolesResult = [];
  for (const index in roles) {
    rolesResult.push({
      name: roles[index].name,
      description: roles[index].description ? roles[index].description : "",
    });
  }
  return rolesResult;
}

module.exports = { mapRequestBodyLocationToModelObject };
