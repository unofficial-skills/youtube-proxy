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
  const videoId = req.params.id;
  const type = req.query.type || defaultType;
  const videoUrl = `http://www.youtube.com/watch?v=${videoId}`;

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

  ytdl.getBasicInfo(videoUrl, error => {
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: 'This video is unavailable'
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

    return ytdl(videoUrl, {
      quality: mediaType.quality
    }).pipe(res);
  });
};
