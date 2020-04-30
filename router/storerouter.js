const express=require('express')
const {storeController}=require('./../controller')
const router=express.Router()

router.get('/get-store',storeController.getstore)
router.post('/post-store',storeController.poststore)
router.delete('/delete-store/:id',storeController.deletestore)
router.put('/edit-store/:id',storeController.editstore)
module.exports=router