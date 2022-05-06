const express = require("express");
const multer = require('multer');
const cors = require("cors");

const app = express();

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// get driver connection
const dbo = require("./db/conn");


// IDK, Connect FILES TO somehow from mongoDB database
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'upload')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({storage}).array('file');

app.post('./upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }

        return res.status(200).send(req.files)
    })
});
// IDK


app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});



