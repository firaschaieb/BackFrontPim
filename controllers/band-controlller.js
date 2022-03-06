const User = require("../models/User");
const Band = require("../models/Band");


exports.getAll = async (req, res) => {
   
    res.send({ band: await Band.find() });
  };




  
exports.add = async (req, res) => {
    const { Nom, user,musicproject } = req.body;
  
    const newBand= new Band();
    
    newBand.Nom = Nom
    newBand.musicproject[newBand.musicproject.length].push() = musicproject 
    newBand.user[newBand.user.length].push() = user
  
    newBand.save();
  
    res.status(201).send({ message: "success", band: newBand });
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
/*
exports.getMy_pub = async (req, res) => {
  console.log(req.params.idk)
 // console.log( req.body.type)
  MusicProject.find({ user: req.params.id }).exec((err,  musicProject)=>{
  
    MusicProject.find({ musicproject:  req.params.idk }).exec((err,  musicProject)=>{
     // console.log(req.params.id)
        res.send(musicProject);
      })
  })

};*/
exports.getMy_pub = async (req, res, next) => {
  const filters = req.query;
  const mp = await MusicProject.find();
  const filteredmusicproject = mp.filter(musicproject => {
    let isValid = true;
    for (key in filters) {
      console.log(key, musicproject[key], filters[key]);
      isValid = isValid && musicproject[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredmusicproject);
};


