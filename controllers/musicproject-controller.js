const User = require("../models/User");
const MusicProject = require("../models/MusicProject");


exports.getAll = async (req, res) => {
   
    res.send({ musicproject: await MusicProject.find() });
  };




  
exports.add = async (req, res) => {
    const { Nom, type, user,style } = req.body;
  
    const newMusicProject= new MusicProject();
    
    newMusicProject.Nom = Nom
    newMusicProject.type = type 
    newMusicProject.style = style
    newMusicProject.user = user
  
    newMusicProject.save();
  
    res.status(201).send({ message: "success", musicproject: newMusicProject });
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


