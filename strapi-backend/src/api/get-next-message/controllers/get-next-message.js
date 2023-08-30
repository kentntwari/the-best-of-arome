"use strict";

/**
 * A set of functions called "actions" for `get-next-message`
 */

const { sanitize } = require("@strapi/utils");
const { contentAPI } = sanitize;

module.exports = {
  getNextMessage: async (ctx, next) => {
    try {
      const contentType = strapi.contentType(
        "api::audio-message.audio-message"
      );

      // if the next message should be included in the specified playlist
      if (ctx.query.playlist) {
        const contentType = strapi.contentType("api::playlist.playlist");
        const sanitizedQueryParams = await contentAPI.query(
          ctx.query,
          contentType,
          ctx.state.auth
        );

        const playlist = await strapi.entityService.findMany(contentType.uid, {
          populate: {
            audio_messages: {
              fields: ["id", "title", "slug"],
            },
          },
          filters: {
            slug: sanitizedQueryParams.playlist,
          },
        });

        const currentID = await playlist[0].audio_messages.findIndex(
          (item) => parseInt(item.id) === parseInt(ctx.params.id)
        );

        const nextMessage =
          playlist[0].audio_messages[currentID + 1] ??
          playlist[0].audio_messages[0];

        return contentAPI.output(nextMessage, contentType, ctx.state.auth);
      }

      // default case
      const entities = await strapi.entityService.findMany(contentType.uid, {
        fields: ["title", "slug"],
        filters: {
          id: parseInt(ctx.params.id) + 1 ?? 1,
        },
      });

      const nextMessage = entities[0];

      return await contentAPI.output(nextMessage, contentType, ctx.state.auth);
    } catch (err) {
      ctx.badRequest("get-next-message controller error", {
        moreDetails: err,
      });
    }
  },
};
