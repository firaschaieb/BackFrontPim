const User = require("../models/User");
const Band = require("../models/Band");


const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");



exports.getAll = async (req, res) => {
   
    res.send({ band: await Band.find() });
  };




  
exports.add = async (req, res) => {
    const { Nom, user } = req.body;
  
    const newBand= new Band();
    
    newBand.Nom = Nom
    //newBand.musicproject[newBand.musicproject.length].push() = musicproject 
    newBand.user= user
  

    try{
      newBand.photo =`${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
     }catch{
      newBand.photo ="http://localhost:3000/upload/default-profile.png"
     }
  
      
    newBand.save();
  
    res.status(201).send({ message: "success", band: newBand });
  };
  
  exports.editProfilePicture = async (req, res, next) => {
    console.log(req.body.email)
    let band = await Band.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
         photoProfil :`${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
        },
      }
    );
    console.log(req.file.filename)
    res.send({ band });
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


///--------------------------------   inv-------------------------------------------




//id2 mtar el band    el heya mta3 el user 



// req  post  http://localhost:3000/api/band

///body
// {
//   "email":"mohamedali.dbira@esprit.tn",
//   "id2":"622a67b824f9082df5ee1752",
// }

exports.sendConfirmationEmail = async (req, res) => {
  console.log(req.body.email)
  //token= makeTokenForUser(req.body.id,req.body.email);
   const user = await User.findOne({ email: req.body.email });
   const band = await Band.findOne({ _id: req.body.id2 });
  console.log("..................req.body.email")
  if (user) {
    // token creation
   // token = makeTokenForUser(user._id, user.email);

   if (band.user.includes(user.id)){
    console.log(req.body.id2);
    console.log(user.id);
    console.log(band)
    res.send({ message: "user in band  " + user.username,});
   }else{
    console.log(".........11111.........req.body.email")
    doSendConfirmationEmail(req.body.email,user.id,req.body.id2);

  res.status(200).send({
    message: "L'email de l invitation a été envoyé a " + req.body.email,
  });
    }
   

  } else {console.log(".........2222.........req.body.email")
    res.status(404).send({ message: "User innexistant" });
  }
};

exports.confirmation = async (req, res, next) => {
    console.log(req.body._id)
  //----------------     el token heya id user           ++++++++++++++++++++++++++++++++++++++++++
  // --------------    el pr heya id mta3 el band        ++++++++++++++++++++++++++++++++++

    const track = await Band.findOne({ _id: req.params.pr });
    try{ track.user.unshift(req.params.token)
         track.save();
    }catch{
      console.log(err)
    }
    
    res.send({ track });
  };

async function makeTokenForUser(_id, email) {
  return jwt.sign({ _id: _id, email: email }, config.token_secret, {
    expiresIn: "100000000", // in Milliseconds (3600000 = 1 hour)
  });
}



async function doSendConfirmationEmail(email, token,pr) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "esprit.peddler.app@gmail.com",
      pass: "peddler-cred",
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
      console.log("Server not ready");
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const urlDeConfirmation =
    "http://localhost:3000/api/band/confirmation/"+token+"/"+ pr;

  const mailOptions = {
    from: "esprit.peddler.app@gmail.com",
    to: email,
    subject: "invitation",

    html:
      "<h3>if you accept the invitation of  "+email+ "  Please press this link : <form> </h3><a href='" +
      urlDeConfirmation +
      "'><input type='button' value=accept here></a></form>",
      // "<form><a href='" + urlDeConfirmation +"'><input type=button value=click here></a></form>"
      
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent : " + info.response);
    }
  });
}

