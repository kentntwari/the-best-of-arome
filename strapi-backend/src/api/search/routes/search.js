module.exports = {
  routes: [
    {
      method: "GET",
      path: "/search",
      handler: "search.fuzzySearch",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
