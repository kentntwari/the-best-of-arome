module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/snippets',
     handler: 'snippets.find',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
