const utils = require('../utils');
const { query } = require('../db');

async function getAll() {
    const milkBar = await query('SELECT id, name, address, city, phone_number FROM milk_bar');
    const milkBarData = utils.getData(milkBar);
    return { milkBar: milkBarData };
}

async function saveMilkBar(data) {
    const result = await query(`INSERT INTO milk_bar (name, address, city, phone_number) VALUES ('${data.name}', '${data.address}', '${data.city}', '${data.phone_number}')`);
  
    let message = 'Error during saving milk bar.';
    if (result.affectedRows) {
      message = 'Milk Bar saved successfully.';
    }

    return { message };
}

async function updateMilkBar(id, data) {
    const result = await query(`UPDATE milk_bar SET name='${data.name}', address='${data.address}', city='${data.city}', phone_number='${data.phone_number}' WHERE id=${id}`);
    
    let message = 'Error during updating milk bar.';
    if (result.affectedRows) {
      message = 'Milk Bar updated successfully.';
    }
    
    return { message };
}

async function removeMilkBar(id) {
    const result = await query(`DELETE FROM milk_bar WHERE id=${id}`);
    
    let message = 'Error during deleting milk bar.';
    if (result.affectedRows) {
      message = 'Milk Bar deleted successfully.';
    }
    
    return { message };
}

module.exports = {
    saveMilkBar,
    updateMilkBar,
    removeMilkBar,
    getAll
}