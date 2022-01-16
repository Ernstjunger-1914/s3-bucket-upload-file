const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { uploadFile, getFileStream } = require('../utils/s3');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/images/:key', (req, res)=> {
  console.log(req.params);

  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

router.post('/images', upload.single('image'), async(req, res)=> {
  const file = req.file;
  console.log(file);

  const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(result);

  const description = req.body.description;
  res.send({imagePath: `/images/${result.Key}`});
});

module.exports = router;
