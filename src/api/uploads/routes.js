const path = require('path')

const uploadsRoutes = ({ postUploadImageHandler }) => [
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: postUploadImageHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
    },
  },
  {
    method: 'GET',
    path: '/upload/{params*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    },
  },
]

module.exports = uploadsRoutes
