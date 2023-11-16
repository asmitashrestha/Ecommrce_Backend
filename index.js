const express = require('express')
const User = require('./model/User')
const app = express()

require('./config/database')

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Home page")
})
app.get('/login',(req,res)=>{
    User.find()
})
app.post('/login',async (req,res)=>{
    try{
        // let exists = await User.findOne({email:req.body.email})
        // if(exists){
        //     return res.status(400).send({
        //         msg:"email already used"
        //     })
        // }
        
       let user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
    })
    res.send(user) 
    }
    catch(err){
        if(err.name == "ValidationError"){
            res.status(400).send({
                err:err.message,
                errors:err.errors

            })
        }else{
            res.status(500).send({
                err:"Server error"
            })
        }
    }
    
})

app.listen(5000,()=>{
    console.log("Server started")
})