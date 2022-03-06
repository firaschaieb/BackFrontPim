const User = require("../models/User");
const MusicProject = require("../models/MusicProject");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
/*********************************             inv       ***************************** */




exports.sendConfirmationEmail = async (req, res) => {
  console.log(req.body.email)
  //token= makeTokenForUser(req.body.id,req.body.email);
   const user = await User.findOne({ email: req.body.email });
  console.log("..................req.body.email")
  if (user) {
    // token creation
   // token = makeTokenForUser(user._id, user.email);
    console.log(".........11111.........req.body.email")
    doSendConfirmationEmail(req.body.email, req.body.id,req.body.id2);

    res.status(200).send({
      message: "L'email de l invitation a été envoyé a " + req.body.email,
    });
  } else {console.log(".........2222.........req.body.email")
    res.status(404).send({ message: "User innexistant" });
  }
};

exports.confirmation = async (req, res, next) => {
    console.log(req.body._id)
  // el token heya id user   
  // el pr heya id mta3 el musicproject

    const track = await MusicProject.findOne({ _id: req.params.pr });
    try{ track.userpv.unshift(req.params.token)
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
    "http://localhost:3000/api/musicproject/confirmation/"+token+"/"+ pr;

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





exports.showCreate= async (req,res) => {
  res.render('confirmation');
},


exports.create = async (req,res)=>{
  const { firstName, lastName, email } = req.body;

  const userExist = await User.findOne({ 'email' : email });
  if(userExist){
      return res.json("Already registred email");
  }

  const user = new User({
      firstName,
      lastName,
      email
  });

  if(req.file){
      user.image = req.file.filename;
  }
  await user.save();
  console.log(User._id)
  res.redirect('/users');
}
