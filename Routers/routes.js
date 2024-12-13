const express = require("express");
const { body } = require("express-validator");
const recordController = require("../controllers/recodeController.js");
const upload = require("../middlewares/recode_Multer.js");
const router = express.Router();

// CRUD Routes
router.get("/", recordController.getAllRecords);
router.get("/showRecord", recordController.showDataRecord);
router.get("/searchDataRecord", recordController.searchDataRecord)
router.post( "/recordCreate",
  [
    body("name").isString().notEmpty(),
    body("email").isEmail(),
    body("phone").isNumeric(),
  ],
  upload.single("image"),
  recordController.createRecord
);
router.get("/recordEdit/:id", recordController.getRecordForEdit);
router.post("/updateRecord/:id",  upload.single("image"), recordController.updateRecord);
router.get("/softDelete/:id", recordController.softDeleteRecord);
router.get("/singleDeleteRecord/:id", recordController.singleDeleteRecord);
router.post("/multiDelete", recordController.multiDelete);

module.exports = router;