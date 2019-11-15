const express= require('express');
const bodyparser= require('body-parser');
// it is middelware between two different ports front(4200) server(3000)
const cors=require('cors')
const PORT=3000;
//now we tell server to use the route

const api=require('./routes/api')

const app=express()// creating intances of express

app.use(cors())

app.use(bodyparser.json()) // to handle json data

app.use('/api',api);
/* when we make a request from localhost 3000 /api the server knows 
it has to use api route and what is the api route it is api.js file with
in  router folder so when u enter the url localhost 3000/api:
 router.get('/',(req,res)=>{
    res.send(' From Api route')
}) 
this get tiggered in router folder
 and response will be from api route
*/

//Testing a get request these request has on argument and one callback function
app.get('/',function(req,res){
    res.send('Hello from Server');
})
app.listen(PORT,function(){console.log('Server Running on localhost : '+PORT)})