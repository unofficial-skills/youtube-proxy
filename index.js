'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/ping', (req, res) => {
  return res.json({
    message: 'pong'
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port} in ${app.get('env')} mode over HTTP`);
});
