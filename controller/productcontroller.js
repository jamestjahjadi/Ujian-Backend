const db = require('./../connection')
const {uploader}=require('./../helper/uploader')
const fs=require('fs')

module.exports={
    //================== GET PRODUCT =================//
    getProduct:(req,res)=>{
        var sql='select * from product'
        db.query(sql,(err,result)=>{
            if(err) res.status(500).send(err)
            res.send(result)
        })
    },
    //================= POST PRODUCT ================//
    postProduct:(req,res)=>{
        try{
            const path='/product'
            const upload=uploader(path,'PST').fields([{name:'image'}])
            upload(req,res,(err)=>{
                if(err){
                    res.status(500).json({
                        message:'Error to Upload Image',error:err.message
                    })
                }
                const {image}= req.files
                const imagepath=image ? path + image[0].filename : null 
                const data = JSON.parse(req.body.data); //berisi object sesuai sql
                data.image=imagepath
                var sql='insert into product set ?'
                db.query(sql,data,(err,result)=>{
                    if(err){
                        fs.unlinkSync('./public' + imagepath);
                        return res.status(500).json({message:'Failed to Upload picture', error:err.message})
                    }
                    sql='select * from product'
                    db.query(sql,(err,result1)=>{
                        if(err)res.status(500).send(err)
                        return res.status(200).send(result1)
                    })
                })
            })
        }catch(error){
            res.status(500).send(error)
        }
    },
    // ================= DELETE PRODUCT ================//
    deleteProduct:(req,res)=>{
        const {id} = req.params
        var sql=`delete from product where product_id=${id}`
        db.query(sql,(err,result)=>{
            if(err) res.status(500).send(err)
            var sql='select * from product'
        db.query(sql,(err,result1)=>{
            if(err) res.status(500).send(err)
            res.send(result1)
        })
        })
    },
    // // ================= EDIT PRODUCT ================//
    editproduct:(req,res)=>{
        const {id}=req.params
        var sql=`select * from product where product_id=${id}`
        db.query(sql,(err,oldresult)=>{
            if(err) res.status(500).send(err)
            if(oldresult.length){
                try{
                    const path='/product'
                    const upload=uploader(path,'UPLD').fields([{name:'image'}])
                    upload (req,res,(err)=>{
                        if(err){
                            res.status(500).json({message:'Error to Upload Image',error:err.message})
                        }
                        const {image}= req.files
                        const imagepath = image ? path + '/' + image[0].filename : oldresult[0].image;
                        const data=JSON.parse(req.body.data);
                        if(imagepath){
                            data.image=imagepath
                        }
                        newsql=`update product set ? where product_id=${id}`
                        db.query(newsql,data,(err67,result67)=>{
                            if(err67){
                                if(imagepath){
                                    fs.unlinkSync('./public' + imagepath)
                                }
                                return res.status(500).json({ message: "error in line 87", error: err67.message });
                            }
                            if(imagepath){
                                if(oldresult[0].image){
                                    fs.unlinkSync('./public' + oldresult[0].image);
                                }
                            }
                            sql='select * from product'
                            db.query(sql,(err89,result89)=>{
                                if(err) res.status(500).send(err89)
                                res.status(200).send(result89)
                            })
                        })
                    })
                }catch(error){
                    return res.status(500).send(error) 
                }
            }else{
                res.status(500).send({message:'error in line 72'})
            }
        })
    }











}