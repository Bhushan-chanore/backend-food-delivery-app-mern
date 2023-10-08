const express = require("express");

const router = express.Router();
const Order = require("../model/Order")

router.post("/orderData" , async(req,res)=>{
 
    let data = req.body.order_data
    await data.splice(0 ,0 ,{order_date:req.body.order_date})

    // if there is not any data exit in db the create : otherwise just insert in many

    let eid = await Order.findOne({"email" : req.body.email})
    console.log(eid);

    if(eid=== null)
    {
        try {
            
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error" , error.message)
        }
    }
    else{
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                {
                    $push:{order_data:data}
                }).then(()=>{
                    res.json({success:true})
                })

        } catch (error) {
            // res.send("Server Error" , error.message)
            res.status(500).send({ error: 'Server Error' });

        }
    }
})


// this for connecting from db so that we fetch data from db
router.post("/myorderData" , async(req,res)=>{
    try {
        let myData = await Order.findOne({"email":req.body.email})
        res.json({orderData:myData})
    } catch (error) {
        res.send("Server Error" , error.message)
    }
})

module.exports = router;