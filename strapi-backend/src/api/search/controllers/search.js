"use strict";

/**
 * A set of functions called "actions" for `search`
 */
const Fuse = require("fuse.js");

module.exports = {
  fuzzySearch: async (ctx) => {
    try {
      const { results } = await strapi
        .service("api::audio-message.audio-message")
        .find(ctx);

      if (ctx.query.q) {
        const searchTerm = ctx.query.q;
        const fuse = new Fuse(results, {
          keys: ["title", "slug"],
          threshold: 0.7,
        });

        const searched = fuse.search(searchTerm, { limit: 5 });

        return searched.map(({ item: { title, slug } }) => {
          return {
            title,
            slug,
          };
        });
      }

      return results;
    } catch (error) {
      ctx.body = error;
    }
  },
};
