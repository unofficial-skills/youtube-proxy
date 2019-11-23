const ytsr = require('ytsr');

/**
 * Module for searching YouTube videos
 *
 * Query params
 * query: string to search for (required)
 * limit: limits the pulled items (default 1)
 *
 */

module.exports = (req, res) => {
  const limit = req.query.limit || 1;
  const searchString = req.query.query;

  if (!searchString) {
    return res.status(500).json({
      status: 'error',
      message: "'query' param is required"
    });
  }

  ytsr.getFilters(searchString, (error, filters) => {
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: error
      });
    }

    const typeFilter = filters.get('Type').find(item => item.name === 'Video');

    ytsr.getFilters(typeFilter.ref, (error, filters) => {
      if (error) {
        return res.status(500).json({
          status: 'error',
          message: error
        });
      }

      const durationFilter = filters.get('Duration').find(o => o.name.startsWith('Short'));
      const options = {
        limit,
        nextpageRef: durationFilter.ref
      };

      ytsr(null, options, (err, searchResults) => {
        if (searchResults === undefined) {
          return res.status(500).json({
            status: 'error',
            message: 'No results found'
          });
        }

        return res.json(searchResults);
      });
    });
  });
};
