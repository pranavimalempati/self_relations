const router = require('express').Router();
const studtController =require('../controller/controller')

router.post("/add",studtController.create)
router.post("/add1",studtController.add)
router.post("/update",studtController.update)
router.post("/find",studtController.find)
router.post("/delete",studtController.remove)

router.post("/insert",studtController.insert)
router.post("/find1",studtController.find1)
router.post("/delete1",studtController.remove1)
router.post("/updt",studtController.update1)



module.exports = router;
