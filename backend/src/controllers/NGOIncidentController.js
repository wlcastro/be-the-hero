const connection = require('../database/connection')


module.exports = {

  async index (req,res) {
    const ngo_id = req.headers.authorization;


    if (!ngo_id){
      return res.status(401).json({error:'Operation not permitted'})
    }

    const incidents = await connection('incident')
      .where('ngo_id',ngo_id)
      .select('*');
  
      return res.json(incidents);
  }

  
};