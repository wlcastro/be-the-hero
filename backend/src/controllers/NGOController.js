const crypto = require('crypto');

const connection = require('../database/connection')


module.exports = {

  async index (req,res) {
      const ngos = await connection('ngo').select('*');
  
      return res.json(ngos);
    },

  async create(req, res) {
    const { name, email, whatsapp, city, fu } =  req.body

    const id = crypto.randomBytes(4).toString('HEX');
  
    await connection('ngo').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      fu
    });
  
    return res.json({ id  })
  }
};