const connection = require('../database/connection')


module.exports = {

  async index (req,res) {
      const { page = 1 } = req.query;

      const [count] = await connection('incident').count();

      const incidents = await connection('incident')
      .join('ngo','ngo_id','=','incident.ngo_id')
      .limit(5)
      .offset((page - 1 ) * 5)
      .select('incident.*',
        'ngo.name',
        'ngo.email',
        'ngo.whatsapp',
        'ngo.city',
        'ngo.fu');
  
      res.header('X-Total-Count',count['count(*)']);

      return res.json(incidents);
    },
 
  async create(req, res) {
    const { title, description, value } =  req.body
    const ngo_id = req.headers.authorization;

  
    const [id] = await connection('incident').insert({
      title,
      description,
      value,
      ngo_id
    });
  
  
    return res.json({ id  })
  },

  async delete(req,res){
    const { id } =  req.params
    const ngo_id = req.headers.authorization;


    const incident = await connection('incident')
    .where('id',id)

    if (incident.length<1){
      return res.status(404).json({error:'Incident not exists'})
    }

    if (incident[0].ngo_id !== ngo_id ){
      return res.status(401).json({error:'Operation not permitted'})
    }

    await connection('incident').where('id',id).delete();

    return res.status(204).send();


  }
};