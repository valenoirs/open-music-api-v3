const autoBind = require('auto-bind')
const config = require('../../utils/config')

class UploadsHandler {
  constructor(storageService, albumsService, validator) {
    this._storageService = storageService
    this._albumsService = albumsService
    this._validator = validator

    autoBind(this)
  }

  async postUploadImageHandler(req, h) {
    const { cover } = req.payload
    this._validator.validateImageHeaders(cover.hapi.headers)

    const { id: albumId } = req.params

    const filename = await this._storageService.writeFile(cover, cover.hapi)
    const fileLocation = `http://${config.app.host}:${config.app.port}/upload/images/${filename}`

    await this._albumsService.updateAlbumCoverById(fileLocation, albumId)

    return h
      .response({
        status: 'success',
        message: 'Sampul berhasil diunggah',
      })
      .code(201)
  }
}

module.exports = UploadsHandler
