const express = require('express')

const app = express()
const port = process.env.PORT || 8000; // Use the port provided by the host or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
app.get('/', (req, res) => {
  res.send('Hey, I\'m a Node.js app!')
})
app.get('/items', (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
})

