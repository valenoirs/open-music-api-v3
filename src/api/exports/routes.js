const exportsRoutes = ({ postExportPlaylistsHandler }) => [
  {
    method: 'POST',
    path: '/export/playlists/{playlistId}',
    handler: postExportPlaylistsHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
]

module.exports = exportsRoutes
