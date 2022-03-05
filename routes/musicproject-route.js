const express = require("express")
const router = express.Router()
const MpController = require("../controllers/musicproject-controller")
const upload = require('../middlewares/storage');
const MusicProject = require("../models/MusicProject");

router.route("/")

    .get(MpController.getAll)
   
    .post( MpController.add)
  
    .put( MpController.edit)
  
    .delete(MpController.delete)
  
router.delete("/all", MpController.deleteAll)

// tafichilek les  repo el kol  mta3 el user 
router.get("/get-my/:id",MpController.getMy)


// tafichilek les  repo el public mta3 el user   localhost:3000/api/musicproject/get-my-public?type=public&user=123   
router.get("/mp-filter",MpController.getMy_pub)










module.exports = router