const router = require('express').Router();
const { tokenExtractor } = require('../util/middleware');

const { Readinglist } = require('../models');

router.post('/', async (req, res) => {
  try {
    const readingList = await Readinglist.create(req.body);
    res.json(readingList);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put('/:id', tokenExtractor, async (req, res) => {
  const readinglist = await Readinglist.findByPk(req.decodedToken.id);
  if (readinglist) {
    readinglist.read = req.body.read;
    await readinglist.save();
    res.json(readinglist);
  } else {
    res.status(404).send();
  }
});

module.exports = router;
