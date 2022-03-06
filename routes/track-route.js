const express = require("express")
const router = express.Router()
const TrackController = require("../controllers/track-controller")
const upload = require('../middlewares/storage');
const multer = require('../multer-config')



router.put("/addMusicTr",multer, TrackController.addMusicTr)
router.route("/")

   .get(TrackController.getAll)
   
    .post( TrackController.add)
  
    .put( TrackController.edit)
  
   // .delete(TrackController.delete)
  
//router.delete("/all", TrackController.deleteAll)

// ta3tik el liste mta3 les branch
router.get("/get-my/:id",TrackController.getMy)

//ta3tik les branch mta3 el rep
router.get("/get-branch-of/:id",TrackController.branch_of)

//      ta3malek filter kima t7eb just zid & esm el param = val    --->       Localhost:3000/api/track/track-filter?musicProject=621f81c23395fb8a838d6e86&user=555

router.get("/track-filter",TrackController.my_branch_in)

module.exports = router