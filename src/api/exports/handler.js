const autoBind = require('auto-bind')

class ExportsHandler {
  constructor(producerService, playlistsService, validator) {
    this._producerService = producerService
    this._playlistsService = playlistsService
    this._validator = validator

    autoBind(this)
  }

  async postExportPlaylistsHandler(req, h) {
    this._validator.validateExportPlaylistsPayload(req.payload)

    const { playlistId } = req.params
    const { targetEmail } = req.payload
    const { userId } = req.auth.credentials

    await this._playlistsService.verifyPlaylistOwner(playlistId, userId)

    const message = {
      targetEmail,
      playlistId,
    }

    await this._producerService.sendMessage(
      'export:playlist',
      JSON.stringify(message)
    )

    return h
      .response({
        status: 'success',
        message: 'Permintaan Anda sedang kami proses',
      })
      .code(201)
  }
}

module.exports = ExportsHandler
