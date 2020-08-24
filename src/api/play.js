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

module.exports = async (req, res) => {
  const defaultType = 'video';
  const validTypes = ['audio', 'video'];
  const videoId = req.params.id;
  const type = req.query.type || defaultType;
  const videoUrl = `http://www.youtube.com/watch?v=${videoId}`;
  const mediaTypes = {
    audio: {
      filter: 'audioonly',
      contentType: 'audio/mp3'
    },
    video: {
      filter: 'video',
      contentType: 'video/mp4'
    }
  };
  const mediaType = mediaTypes[type];

  if (!ytdl.validateID(videoId)) {
    return res.status(500).json({
      status: 'error',
      message: 'Invalid id'
    });
  }

  if (!validTypes.includes(type)) {
    return res.status(500).json({
      status: 'error',
      message: 'Invalid type'
    });
  }

  await ytdl
    .getBasicInfo(videoUrl, {
      filter: mediaType.filter
    })
    .then(() => {
      res.set('content-type', mediaType.contentType);

      return ytdl(videoUrl, {
        filter: mediaType.filter
      }).pipe(res);
    })
    .catch(() => {
      return res.status(500).json({
        status: 'error',
        message: 'This video is unavailable'
      });
    });
};
