"use strict";

/**
 * browsepage controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::browsepage.browsepage",
  ({ strapi }) => ({
    async find(ctx) {
      const data = await strapi
        .service("api::browsepage.browsepage")
        .find(ctx.query);

      return {
        coverText: data.headertext,
        coverImage: {
          altText: data?.coverimage?.alternativeText,
          width: data?.coverimage?.width,
          height: data?.coverimage?.height,
          public_id: data?.coverimage?.provider_metadata?.public_id,
          url: data?.coverimage?.url,
        },
      };
    },
  })
);
