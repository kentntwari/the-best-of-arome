'use strict';

/**
 * audio-message service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::audio-message.audio-message');
