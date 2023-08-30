module.exports = {
  routes: [
    {
      method: "GET",
      path: "/playlists/:playlist", 
      handler: "playlist.findByPlaylist",
    },
  ],
};
