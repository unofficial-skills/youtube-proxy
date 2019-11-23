const express = require('express');
const searchApi = require('./api/search');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) =>
  res.json({
    message: 'YouTube proxy API that search and stream videos/audios'
  })
);

app.get('/api/search', searchApi);

app.listen(port, () => {
  console.log(`Listening on port ${port} in ${app.get('env')} mode over HTTP`);
});
