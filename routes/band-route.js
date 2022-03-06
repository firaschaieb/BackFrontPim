const express = require("express")
const router = express.Router()
const bandController = require("../controllers/band-controlller")
const upload = require('../middlewares/storage');


router.route("/")

    .get(bandController.getAll)
   
    .post( bandController.add)
  
   /* .put( bandController.edit)
  
    .delete(bandController.delete)
  
router.delete("/all", bandController.deleteAll)

// tafichilek les  repo el kol  mta3 el user 
router.get("/get-my/:id",bandController.getMy)


// tafichilek les  repo el public mta3 el user   localhost:3000/api/musicproject/get-my-public?type=public&user=123   
router.get("/band-filter",bandController.getMy_pub)









*/
module.exports = router