const utils = require('../utils');
const { query } = require('../db');

async function getAll() {
  const menuResult = await query('SELECT id, food, price, milk_bar_id FROM menu');
  const menuData = utils.getData(menuResult);
  return { menu: menuData };
}

async function saveMenu(data) {
  const result = await query(`INSERT INTO menu (food, price, milk_bar_id) VALUES ('${data.food}', '${data.price}', '${data.milk_bar_id}')`);

  let message = 'Error during saving menu.';
  if (result.affectedRows) {
    message = 'Menu saved successfully.';
  }

  return { message };
}

async function updateMenu(id, data) {
  const result = await query(`UPDATE menu SET food='${data.food}', price='${data.price}', milk_bar_id='${data.milk_bar_id}' WHERE id=${id}`);
  
  let message = 'Error during updating menu.';
  if (result.affectedRows) {
    message = 'Menu updated successfully.';
  }
  
  return { message };
}

async function removeMenu(id) {
  const result = await query(`DELETE FROM menu WHERE id=${id}`);
  
  let message = 'Error during deleting menu.';
  if (result.affectedRows) {
    message = 'Menu deleted successfully.';
  }
  
  return { message };
}

module.exports = {
  getAll,
  saveMenu,
  updateMenu,
  removeMenu
}