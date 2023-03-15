module.exports = {
  responses:{
    privateAttributes:['_v','createdAt','updatedAt','publishedAt']
  },
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
};
