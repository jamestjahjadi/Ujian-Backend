const db = require('./../connection')

module.exports={
    //================== GET INVENTORY =================//
    getinventory:(req,res)=>{
        var longsql='select p.nama , s.branch_store from inventory i join product p on i.product_id = p.product_id join store s on i.store_id = s.store_id;'
        db.query(longsql,(err,result)=>{
            if(err) res.status(500).send(err)
            res.status(200).send(result)
        })
    },
    //================== POST INVENTORY =================//
    postinventory:(req,res)=>{
        var newinventory=req.body
        var sql='insert into inventory set ?'
        db.query(sql,newinventory,(err,result)=>{
            if(err) res.status(500).send(err)
            var longsql='select p.nama , s.branch_store from inventory i join product p on i.product_id = p.product_id join store s on i.store_id = s.store_id;'
            db.query(longsql,(err,result1)=>{
                if(err) res.status(500).send(err)
                res.status(200).send(result1)
            })
        })
    },
    //================== DELETE INVENTORY =================//
    deleteinventory:(req,res)=>{
        const{id}=req.params
        var sql=`delete from inventory where inventory_id=${id}`
        db.query(sql,(err,result)=>{
            if(err) res.status(500).send(err)
            var sql='select * from inventory'
            db.query(sql,(err1,result1)=>{
                if(err1)res.status(500).send(err1)
                res.status(200).send(result1)
            })
        })
    },
    //================== EDIT INVENTORY =================//
    editinventory:(req,res)=>{
        const {id}=req.params
        const newinv=req.body
        var sql=`update inventory set ? where inventory_id=${id}`
        db.query(sql,newinv,(err,result)=>{
            if(err) res.status(500).send(err)
            var longsql='select p.nama , s.branch_store from inventory i join product p on i.product_id = p.product_id join store s on i.store_id = s.store_id;'
            db.query(longsql,(err,result1)=>{
            if(err) res.status(500).send(err)
            res.status(200).send(result1)
        })
        })
    }















}