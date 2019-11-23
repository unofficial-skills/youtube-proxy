const ytdl = require('ytdl-core');

/**
 * Module for downloading Youtube videos
 *
 * Params
 * id: YouTube video id
 *
 * Query params
 * type: audio or video (default video)
 *
 */

module.exports = (req, res) => {
  const defaultType = 'video';
  const validTypes = ['audio', 'video'];
  const type = req.query.type || defaultType;

  if (!validTypes.includes(type)) {
    return res.status(500).json({
      status: 'error',
      message: 'Invalid type'
    });
  }

  const mediaTypes = {
    audio: {
      quality: 'highestaudio',
      contentType: 'audio/mp3'
    },
    video: {
      quality: 'highestvideo',
      contentType: 'video/mp4'
    }
  };
  const mediaType = mediaTypes[type];

  res.set('content-type', mediaType.contentType);

  return ytdl(`http://www.youtube.com/watch?v=${req.params.id}`, {
    quality: mediaType.quality
  }).pipe(res);
};
