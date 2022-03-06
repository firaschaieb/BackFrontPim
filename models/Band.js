const mongoose = require('mongoose');
const MusicProject = require('./Track');


const BandSchema = new mongoose.Schema({
    Nom: {
        type: String,
        required: true
    },
 


    musicproject:[{
        type:String,
        required:true
       
    }],
 

    user:[{
        type:String,
        required:true
        //type: mongoose.Schema.Types.ObjectId,
       // ref: 'User'
    }]
    
},
{
  timestamps: { currentTime: () => Date.now() },
}

);
 
module.exports = mongoose.model('Band',BandSchema)