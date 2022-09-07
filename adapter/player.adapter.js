function mapRequestBodyPlayerToModelObject(reqData) {
  const { id, name, socketId } = reqData;
  return {
    id: id ? id : null,
    model: {
      name: name ? name : null,
      socketId: socketId ? socketId : null,
    },
  };
}

module.exports = { mapRequestBodyPlayerToModelObject };
