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
  //console.log(track)
  res.send({ track });
};

//----------------------------------------------------------------

//              test mixing


exports.mix = async (req, res, next) => {
  //var datatosend ;

  //const python = spawn('python3',['mix.py']     );
  console.log(req.body._id)
  const track = await Track.findOne({ _id: req.body._id });
  console.log(req.body._id)
  const track2 = await Track.findOne({ _id: req.body._id2 });
  var spawn = require("child_process").spawn;
console.log(track.MusicTr[0])
	var process  = spawn('python',["./mixing/mix.py",track.MusicTr[0],track2.MusicTr[0],req.body.nb]);
  console.log(req.body.nb)
  //track.MusicTr.unshift(`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`)
	process.stdout.on('data',function(data){


		console.log(`stdout:${data}`);
	});
  process.stderr.on('data',function(data){

    console.log(`stderr:${data}`);
	});


};
