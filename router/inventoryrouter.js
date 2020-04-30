const express=require('express')
const router=express.Router()
const {inventoryController} = require ('./../controller')

router.get('/get-inventory',inventoryController.getinventory)
router.post('/post-inventory',inventoryController.postinventory)
router.delete('/delete-inventory',inventoryController.deleteinventory)
router.put('/edit-inventory/:id',inventoryController.editinventory)
module.exports=router