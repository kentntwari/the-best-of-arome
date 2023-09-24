"use strict";

/**
 * A set of functions called "actions" for `get-next-message`
 */

const { sanitize } = require("@strapi/utils");
const { contentAPI } = sanitize;

module.exports = {
  cue: async (ctx, next) => {
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
            slug: ctx.query.playlist,
          },
        });

        const currentID = await playlist[0].audio_messages.findIndex(
          (item) => parseInt(item.id) === parseInt(ctx.params.id)
        );

        const previousMessage =
          playlist[0].audio_messages[currentID - 1] ?? null;

        const nextMessage = playlist[0].audio_messages[currentID + 1] ?? null;

        return contentAPI.output(
          [{ prev: previousMessage, next: nextMessage }],
          contentType,
          ctx.state.auth
        );
      }

      // default case
      const entities = await strapi.entityService.findMany(contentType.uid, {
        fields: ["title", "slug"],
        filters: {
          id: {
            $in: [parseInt(ctx.params.id) - 1, parseInt(ctx.params.id) + 1],
          },
        },
      });

      const formatted = [
        {
          prev:
            entities
              .filter((item) => item.id < parseInt(ctx.params.id))
              .at(0) ?? null,
          next:
            entities
              .filter((item) => item.id > parseInt(ctx.params.id))
              .at(0) ?? null,
        },
      ];

      return await contentAPI.output(formatted, contentType, ctx.state.auth);
    } catch (err) {
      ctx.badRequest("cue controller for next message error", {
        audioID: ctx.params.id,
        playlist: ctx.query.playlist,
      });
    }
  },
};
