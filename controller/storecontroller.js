const db = require('./../connection')

module.exports={
     //================== GET STORE =================//
    getstore:(req,res)=>{
        var sql='select * from store'
        db.query(sql,(err,result)=>{
            if(err) res.status(500).send(err)
            res.status(200).send(result)
        })
    },

     //================== POST STORE =================//
    poststore:(req,res)=>{
        const branch=req.body
        var sql='insert into store set ?'
        db.query(sql,branch,(err,result)=>{
            if(err) res.status(500).send(err)
            sql='select * from store'
            db.query(sql,(err,result1)=>{
                if(err) res.status(500).send(err)
                res.status(200).send(result1)
            })
        })
        },
     //================== DELETE STORE =================//
     deletestore:(req,res)=>{
         const {id}=req.params
         var sql=`delete from store where store_id=${id}`
         db.query(sql,(err,result1)=>{
            if(err) res.status(500).send(err)
            var sql='select * from store'
            db.query(sql,(err,result)=>{
            if(err) res.status(500).send(err)
            res.status(200).send(result)
        })
         })
     },
       //================== EDIT STORE =================//
     editstore:(req,res)=>{
         const {id}=req.params
         const updtstr=req.body
         var sql=`update store set ? where store_id=${id}`
         db.query(sql,updtstr,(err,result)=>{
             if(err) res.status(500).send(err)
             var sql='select * from store'
            db.query(sql,(err,result1)=>{
            if(err) res.status(500).send(err)
            res.status(200).send(result1)
        })
         })
     }


















    }