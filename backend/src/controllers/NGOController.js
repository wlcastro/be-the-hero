const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection')


module.exports = {

  async index (req,res) {
      const ngos = await connection('ngo').select('*');
  
      return res.json(ngos);
    },

  async create(req, res) {
    const { name, email, whatsapp, city, fu } =  req.body

    const id = generateUniqueId()
  
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