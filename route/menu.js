const express = require('express');
const router = express.Router();
const menuService = require('../service/menu')

router.get('/', async (req, res, next) => {
    try {
        const result = await menuService.getAll();
        res.json(result);
    } catch (error) {
        console.error(`Error during getting data. ${error.message}`);
        next(error);
    }
});

router.post('/post', async function(req, res, next) {
  console.log (req)

  try {
    const data = req.body;
    res.json(await menuService.saveMenu(data));
  } catch (err) {
    console.error('Menu saving error.', err.message);
    next(err);
  }
});

router.put('/put/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    res.json(await menuService.updateMenu(id, data));
  } catch (err) {
    console.error('Error while updating menu.', err.message);
    next(err);
  }
});

router.delete('/delete/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    res.json(await menuService.removeMenu(id));
  } catch (err) {
    console.error('Error while deleting menu.', err.message);
    next(err);
  }
});

module.exports = router;