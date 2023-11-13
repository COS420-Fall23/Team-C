// Node.js server
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/createFile', (req, res) => {
  const fileName = req.body.fileName;
  const fileContent = req.body.fileContent;

  fs.appendFile(fileName, fileContent, (err) => {
    if (err) {
      res.status(500).send('Error creating the file');
    } else {
      res.status(200).send('File created successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});