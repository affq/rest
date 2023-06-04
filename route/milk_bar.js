const express = require('express');
const router = express.Router();
const milkbarService = require('../service/milk_bar')

router.use(express.json());

router.get('/', async (req, res, next) => {
    try {
        const result = await milkbarService.getAll();
        res.json(result);
    } catch (error) {
        console.error(`Error during getting data. ${error.message}`);
        next(error);
    }
});

router.post('/post', async function(req, res, next) {
    try {
      const data = req.body;
      res.json(await milkbarService.saveMilkBar(data));
    } catch (err) {
      console.error('Milk Bar saving error.', err.message);
      next(err);
    }
  });
  
router.put('/put/:id', async function(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      res.json(await milkbarService.updateMilkBar(id, data));
    } catch (err) {
      console.error('Error while updating milk bar.', err.message);
      next(err);
    }
});

router.delete('/delete/:id', async function(req, res, next) {
    try {
      const { id } = req.params;
      res.json(await milkbarService.removeMilkBar(id));
    } catch (err) {
      console.error('Error while deleting milk bar.', err.message);
      next(err);
    }
});

module.exports = router;

