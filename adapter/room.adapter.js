function mapRequestBodyRoomToModelObject(reqData) {
  const { id, code, name, ownerId, roundTime } = reqData;
  return {
    id: id ? id : null,
    model: {
      name: name ? name : null,
      code: code ? code : null,
      mode: mode ? mode : 0,
      ownerId: ownerId ? ownerId : null,
      players: [
        {
          id: ownerId ? ownerId : null,
        },
      ],
      roundTime: roundTime ? roundTime : null,
      location: mapLocation(location),
    },
  };
}

function mapLocation(locations) {
  let result = [];
  for (const location of locations) {
    result.push({
      id: location.id,
      name: location.name,
      state: location.state,
    });
  }
  return result;
}

module.exports = { mapRequestBodyRoomToModelObject };
