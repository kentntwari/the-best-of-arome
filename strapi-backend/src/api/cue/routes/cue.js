/* DEFAULT CREATED WITH STRAPI CLI */
/* UNCOMMENT IF READY TO CREATED COMPLETELY CUSTOM ROUTE */
module.exports = {
  routes: [
    {
      method: "GET",
      path: "/cue/:id",
      handler: "cue.cue",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
