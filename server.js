const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const path =require('path');
const aWss = expressWs.getWss('/');

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
  res.send(path.join(__dirname, './index.html'))
})

app.ws('/', function(ws, req) {
  ws.onmessage = (msg) => {
    aWss.clients.forEach( (client) => {
        client.send(msg.data)
    })
  };
});

app.listen(3000, () => {
  console.log('Server listening on port: 3000');
});