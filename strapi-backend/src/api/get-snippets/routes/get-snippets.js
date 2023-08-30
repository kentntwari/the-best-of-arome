module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/get-snippets',
     handler: 'get-snippets.getSnippets',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
