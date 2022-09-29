function mapRequestBodyRoomToModelObject(reqData) {
  const {
    id,
    code,
    mode,
    name,
    ownerId,
    players,
    roundTime,
    location,
    numOfSpy,
  } = reqData;
  return {
    id: id ? id : null,
    model: {
      name: name ? name : null,
      code: code ? code : null,
      mode: mode ? mode : 0,
      ownerId: ownerId ? ownerId : null,
      players: players ? mapPlayer(players) : null,
      roundTime: roundTime ? roundTime : null,
      location: location ? mapLocation(location) : null,
      numOfSpy: numOfSpy ?? null,
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

function mapPlayer(players) {
  let result = [];
  for (const player of players) {
    result.push({
      id: player.id ? player.id : null,
      role: player.role ? player.role : null,
    });
  }
  return result;
}

module.exports = { mapRequestBodyRoomToModelObject };
