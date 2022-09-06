function mapRequestBodyPlayerToModelObject(reqData) {
  const { _id, name, socketId } = reqData;
  return {
    id: _id ? _id : null,
    model: {
      name: name ? name : null,
      socketId: socketId ? socketId : null,
    },
  };
}

module.exports = { mapRequestBodyPlayerToModelObject };
