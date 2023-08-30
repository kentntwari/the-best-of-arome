"use strict";

/**
 * homepage controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::homepage.homepage",
  ({ strapi }) => ({
    async find(ctx) {
      const data = await strapi.entityService.findOne(
        "api::homepage.homepage",
        1,
        {
          populate: "*",
        }
      );

      return {
        coverText: data.headertext,
        coverImages: data.headerimages?.map(
          ({
            alternativeText,
            width,
            height,
            formats,
            provider_metadata: { public_id },
            url,
          }) => {
            return {
              altText: alternativeText,
              width,
              height,
              formats: Object.entries(formats).reduce(
                (acc, [key, value]) => ({
                  ...acc,
                  [key]: {
                    width: value.width,
                    height: value.height,
                    public_id: value.provider_metadata.public_id,
                    url: value.url,
                  },
                }),
                {}
              ),
              public_id,
              url,
            };
          }
        ),
      };
    },
  })
);