"use strict";

/**
 * playlist controller
 *
 *
 */

const { createCoreController } = require("@strapi/strapi").factories;

// reusable function to generate better syntax
function formatEntries(entries) {
  if (entries && entries?.length > 0)
    return entries?.map((entry) => {
      return {
        id: entry?.id,
        name: entry?.name,
        description: entry?.description,
        slug: entry?.slug,
        catalogue: entry?.audio_messages?.map((single) => {
          return {
            id: single?.id,
            title: single?.title,
            slug: single?.slug,
            duration: single?.audio?.size,
            publicID: single?.audio?.provider_metadata?.public_id,
            url: single?.audio?.url,
          };
        }),
      };
    });
}

module.exports = createCoreController(
  "api::playlist.playlist",
  ({ strapi }) => ({
    async find(ctx) {
      const { data } = await super.find(ctx);

      return data.map(({ attributes: { name, slug } }) => {
        return {
          name,
          slug,
        };
      });
    },

    async findByPlaylist(ctx) {
      try {
        // raw data
        const { meta } = await super.find(ctx);
        const entries = await strapi.entityService.findMany(
          "api::playlist.playlist",
          {
            fields: ["name", "description", "slug"],
            populate: {
              audio_messages: {
                fields: ["id", "title", "description", "slug"],
                populate: {
                  audio: {
                    fields: [
                      "alternativeText",
                      "size",
                      "url",
                      "provider_metadata",
                    ],
                  },
                },
              },
            },
            filters: {
              slug: ctx.params.playlist,
            },
          }
        );

        switch (ctx.query.sortBy) {
          case "duration": {
            return formatEntries([...entries]).map((item) => {
              return {
                ...item,
                catalogue: item.catalogue.sort((a, b) => {
                  if (ctx.query.order === "desc")
                    return b?.duration - a?.duration;

                  return a?.duration - b?.duration;
                }),
              };
            });
          }

          case "id": {
            return formatEntries([...entries]).map((item) => {
              return {
                ...item,
                catalogue: item.catalogue.sort((a, b) => {
                  if (ctx.query.order === "desc") return b?.id - a?.id;

                  return a?.id - b?.id;
                }),
              };
            });
          }

          default: {
            return formatEntries([...entries]);
          }
        }
      } catch (error) {
        ctx.body = error;
      }
    },
  })
);
