/* DEFAULT CREATED WITH STRAPI CLI */
/* UNCOMMENT IF READY TO CREATED COMPLETELY CUSTOM ROUTE */
module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/get-next-message/:id',
     handler: 'get-next-message.getNextMessage',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
