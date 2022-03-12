const User = require("../models/User");
const MusicProject = require("../models/MusicProject");
const Track = require("../models/Track");




exports.getAll = async (req, res) => {
   
    res.send({ track: await Track.find() });
  };




exports.add = async (req, res) => {
  console.log('111')
    const { Nom,musicProject,tempo,measure,key,instrument , user} = req.body;
  
    const newTrack= new Track();
    
    newTrack.Nom = Nom
    newTrack.instrument = instrument 
    newTrack.key=key
    newTrack.measure=measure
    newTrack.tempo=tempo
    newTrack.musicProject=musicProject
    newTrack.user = user
     
    const musicproject = await MusicProject.findOne({ _id: musicProject });
    if (musicproject.userpv.includes(user )){
      newTrack.save()
      res.status(201).send({ message: "success", track: newTrack });
    }else{
      res.status(403).send({ message: "you need an inv" });
    }
    
    console.log(musicProject)
    console.log(user)
    
  };

  exports.delete = async (req, res) => {
    const track = await Track.findById(req.body._id).remove();
    res.status(201).send({ message: "success", track: track });
  };


  exports.edit = async (req, res) => {
    const {  _id,Nom,tempo,measure,key,instrument}  = req.body;
  
    let track = await Track.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          Nom:Nom,
          tempo:tempo,
          measure:measure,
          key:key,
          instrument:instrument,
        },
      }
    );
    res.status(201).send({ message: "success", track: track });
  };
  
  
  
exports.getMy = async (req, res) => {
  console.log(req.params.id)
 Track.find({ user: req.params.id }).exec((err,  track)=>{
  console.log(req.params.id)
    res.send(track);
  })
};
exports.branch_of = async (req, res) => {
  console.log(req.params.id)
 Track.find({ musicProject: req.params.id }).exec((err,  track)=>{
  console.log(req.params.id)
    res.send(track);
  })
};

exports.my_branch_in = async (req, res, next) => {
  const filters = req.query;
  const mp = await Track.find();
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






exports.addMusicTr = async (req, res, next) => {
  console.log(req.body._id)

  const track = await Track.findOne({ _id: req.body._id });
  try{ track.MusicTr.unshift(`${req.protocol}://${req.get('host')}/upload/${req.file.filename}`)
       track.save();
  }catch{
    console.log(err)
  }
  console.log(track)
  res.send({ track });
};
