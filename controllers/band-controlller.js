const User = require("../models/User");
const MusicProject = require("../models/MusicProject");
const Band = require("../models/Band");


exports.getAll = async (req, res) => {
   
    res.send({ band: await Band.find() });
  };




  
exports.add = async (req, res) => {
    const { Nom, type, user,style } = req.body;
  
    const newband= new Band();
    
    newband.Nom = Nom
  
    newband.style = style
    newband.user = user
    newband.musicproject = musicproject
  
    newband.save();
  
    res.status(201).send({ message: "success", band : newband });
  };
  
  exports.edit = async (req, res) => {
    const { _id, style, type, Nom,  } = req.body;
  
    let musicproject = await MusicProject.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          Nom:Nom,
          style:style,
         type :type ,
       
        },
      }
    );
    res.status(201).send({ message: "success", musicproject: musicproject });
  };
  
  exports.delete = async (req, res) => {
    const musicproject = await MusicProject.findById(req.body._id).remove();
    res.status(201).send({ message: "success", musicproject: musicproject });
  };
  
  exports.deleteAll = async (req, res) => {
    MusicProject.remove({}, function (err, musicproject) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send({ message: "Aucun element" });
    });
  };
  

  
exports.getMy = async (req, res) => {

  MusicProject.find({ user: req.params.id }).exec((err,  musicProject)=>{
    
    res.send(musicProject);
  })
};

exports.getMy_pub = async (req, res) => {
  console.log(req.params.id)

  MusicProject.find({ user: req.params.id }).exec((err,  musicProject)=>{
  
    MusicProject.find({ type: "public" }).exec((err,  tRack)=>{
      console.log(req.params.id)
        res.send(tRack);
      })
  })

};
