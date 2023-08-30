"use strict";

/**
 * audio-message controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::audio-message.audio-message",
  ({ strapi }) => ({
    async find(ctx) {
      function formatEntries(entries) {
        if (entries && entries?.length > 0)
          return entries?.map((entry) => {
            return {
              id: entry?.id,
              title: entry?.title,
              description: entry?.description,
              slug: entry?.slug,
              duration: entry?.audio?.size,
              altText: entry?.audio?.alternativeText,
              publicID: entry?.audio?.provider_metadata?.public_id,
              url: entry?.audio?.url,
              playlist: entry?.playlist,
            };
          });
      }

      if (ctx.query.q) {
        const filteredEntries = await strapi.entityService.findMany(
          "api::audio-message.audio-message",
          {
            fields: ["id", "title", "description", "slug"],
            populate: {
              audio: {
                fields: ["alternativeText", "size", "url", "provider_metadata"],
              },
              playlist: {
                fields: ["name", "slug"],
              },
            },
            filters: {
              slug: ctx.query.q,
            },
          }
        );

        return formatEntries([...filteredEntries]);
      }

      const entries = await strapi.entityService.findMany(
        "api::audio-message.audio-message",
        {
          fields: ["id", "title", "description", "slug"],
          populate: {
            audio: {
              fields: ["alternativeText", "size", "url", "provider_metadata"],
            },
            playlist: {
              fields: ["name", "slug"],
            },
          },
          page: ctx.query.page ?? 1,
          pageSize: 20,
        }
      );

      return formatEntries([...entries]);
    },
  })
);
