const express = require('express');

// API modules
const playApi = require('./api/play');
const searchApi = require('./api/search');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) =>
  res.json({
    message: 'YouTube proxy API that search and stream videos/audios'
  })
);

// /api/search?query=ABC (default limit 1)
// /api/search?query=ABC&limit=5
app.get('/api/search', searchApi);

// /api/play/:id (default type video)
// /api/play/:id?type=video
// /api/play/:id?type=audio
app.get('/api/play/:id', playApi);

app.listen(port, () => {
  console.log(`Listening on port ${port} in ${app.get('env')} mode over HTTP`);
});
