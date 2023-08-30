"use strict";

/**
 * A set of functions called "actions" for `get-snippets`
 */

const { sanitize } = require("@strapi/utils");
const { contentAPI } = sanitize;

module.exports = {
  getSnippets: async (ctx, next) => {
    const contentType = strapi.contentType("api::audio-message.audio-message");
    const sanitizedQueryParams = await contentAPI.query(
      ctx.query,
      contentType,
      ctx.state.auth
    );

    try {
      const snippets = await strapi.entityService.findMany(contentType.uid, {
        populate: {
          audio: {
            fields: ["alternativeText", "url", "size", "provider_metadata"],
          },
        },
        sort: {
          publishedAt: "desc",
        },
        limit: 4,
      });

      return await contentAPI.output(
        snippets.map(
          ({
            title,
            slug,
            audio: {
              alternativeText,
              url,
              size,
              provider_metadata: { public_id },
            },
          }) => {
            return {
              title,
              slug,
              alternativeText,
              duration: size,
              url,
              publicID: public_id,
            };
          }
        ),
        contentType,
        ctx.state.auth
      );
    } catch (err) {
      ctx.badRequest("get-snippets controller error", {
        moreDetails: err,
      });
    }
  },
};
