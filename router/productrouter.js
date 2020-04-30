const express=require('express')
const {productController}=require('./../controller')
const router=express.Router()

router.get('/get-product',productController.getProduct)
router.post('/post-product',productController.postProduct)
router.delete('/delete-product/:id',productController.deleteProduct)
router.put('/edit-product/:id',productController.editproduct)
module.exports=router