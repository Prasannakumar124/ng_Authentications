const express =require('express');
/*here we write all api end points*/
const jwt=require('jsonwebtoken')
const router=express.Router();
/*All dataBase request or going to manage in api route api.js 
Sothe database connection happend in the api.js   */
const mongoose=require('mongoose')
//declaring connection string in the database
const db='mongodb://prasanna:prasanna59@ds227243.mlab.com:27243/authorization_db'
//connect to database mongoose.connect(databasedetails,callback if error display it otherwise result message)
mongoose.connect(db,(err)=>{
    if(err){
        console.error('Error :' +err)
    }else{
        console.log('connected to mongoDB')
    }
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('unauthorized request')
    }
    let token=req.headers.authorization.split(' ')[1]
    if(token==='null'){
        return res.status(401).send('unauthorized request')
    }
    let payload=jwt.verify(token,'secretkey')
    if(!payload){
        return res.status(401).send('unauthorized request')
    }
    req.userId=payload.subject
    next()
}
const User=require('../Model/user')
router.get('/',(req,res)=>{
    res.send(' From Api route')
})

/*
1.create register api to send data to mongoDB
2.we need to access  a request and a response
3.with in the function body first step to extract user information from 
    the request body 
4.finall step is to save data 
*/
router.post('/register',(req,res)=>{
let userdata=req.body
// these userdata convert it into usermodel that mongoose can understand
// we have user.js in model
//so import it in api.js file after that
  let user= new User(userdata);
  //now we have user that mongoose can understand the structure 
  // to save data mongoose .save() method which as a callback 
  //it may give u error or the registerd user
  user.save((error,registerduser)=>{
      if(error){
          console.log(error)
      }else{
          let payload={subject:registerduser._id}
          let token=jwt.sign(payload,'secretkey')
        //   res.status(200).send(registerduser)
        res.status(200).send({token})
          //.send() sent data to mongoDB specifed collection
      }
      //nodemon used to restart server after changes
  })
})

router.post('/login',(req,res)=>{
    let userdata=req.body
    User.findOne({email:userdata.email},(err,userdetails)=>{
        if(err){
            console.log("Error:"+err);
        }else{
            if(!userdetails){
                res.status(401).send('Invalid userName')
            }else{
                if(userdetails.password !=userdata.password){
                    res.status(401).send('Invalid Password')
                }else{
                    let payload={subject:userdetails._id};
                   let token=jwt.sign(payload,'secretkey') 
                    // res.status(200).send("details"+userdetails)
                    res.status(200).send({token})
                }
            }
        }
    })

})

router.get('/events',(req,res)=>{
    let events=[
        {
            "id":"1",
            "name":"Auto Expo",
            "description":"lorem ipusm",
            "date":"2012-04-23T18:25:43.5112"
        },
        {
            "id":"2",
            "name":"Auto Expo",
            "description":"lorem ipusm",
            "date":"2012-04-23T18:25:43.5112"
        },        {
            "id":"3",
            "name":"Auto Expo",
            "description":"lorem ipusm",
            "date":"2012-04-23T18:25:43.5112"
        },        {
            "id":"4",
            "name":"Auto Expo",
            "description":"lorem ipusm",
            "date":"2012-04-23T18:25:43.5112"
        } , 
        {
            "id":"5",
            "name":"Auto Expo",
            "description":"lorem ipusm",
            "date":"2012-04-23T18:25:43.5112"
        }
    ]
    res.json(events)
})
router.get('/special',verifyToken,(req,res)=>{
    let events=[
        {
            "id":"1",
            "name":"Auto Expo",
            "description":"lorem ipusm",
            "date":"2012-04-23T18:25:43.5112"
        },
        {
            "id":"2",
            "name":"Auto Expo",
            "description":"lorem ipusm",
            "date":"2012-04-23T18:25:43.5112"
        },        {
            "id":"3",
            "name":"Auto Expo",
            "description":"lorem ipusm",
            "date":"2012-04-23T18:25:43.5112"
        },        {
            "id":"4",
            "name":"Auto Expo",
            "description":"lorem ipusm",
            "date":"2012-04-23T18:25:43.5112"
        } , 
        {
            "id":"5",
            "name":"Auto Expo",
            "description":"lorem ipusm",
            "date":"2012-04-23T18:25:43.5112"
        }
    ]
    res.json(events)
})

//finally we export the router
module.exports=router;
//now we tell server to use these route