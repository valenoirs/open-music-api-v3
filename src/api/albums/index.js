const AlbumsHandler = require('./handler')
const albumsRoutes = require('./routes')

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { albumsService, songsService, validator }) => {
    const albumHandler = new AlbumsHandler(
      albumsService,
      songsService,
      validator
    )

    server.route(albumsRoutes(albumHandler))
  },
}
