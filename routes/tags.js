const express = require('express');
const Joi = require('joi');
const path = require('path');
const mysqlConnection = require('../connection');
const Router = express.Router();
const bodyParser = require('body-parser');
const current = new Date();

//middleware
  app.use('/public', express.static(path.join(__dirname, 'static')));
  app.use(bodyParser.urlencoded({extended: false}));
  app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'test.html'));
  }); 
  //app.use('/people', people);
  app.post('/',(req, res)=>{
  console.log(req.body.fname);
    //database wprk here
  res.send('successfully posted data');
  });
  app.listen(3000);


const tagreadSchema = Joi.object({
    epc: Joi.string().hex().pattern(/(E98A25)([0-9]|[A-F]|(\-)){10}((\d|\-){8})/).length(24).required(),
    antenna : Joi.number().min(1).max(4).required(),
    rssi : Joi.number().min(-70).max(0).required(),
    timestampreader : Joi.string().length(10).pattern(/\d{13}/).required(),//Joi.number().required(),
    timestamprecv: Joi.number(),
 });
let rfid1 = {
    "epc" : "E98A25FB67B7C6AC65346377",
	"Antenna" : 4,
	"RSSI" : -63,
	"Timestamp" : 4538456352764
}

let rfid2 ={
    "epc" : "E98A25FB67C6A5FB76352847",
	"Antenna" : 2,
	"RSSI" : -3,
	"Timestamp" : 3527458693623
}

let rfid3 = {
	"epc" : "E98A25FB6-C6A5-B76355487",
	"Antenna" : 1,
	"RSSI" : -5,
	"Timestamp" : 3527458693533
}

//let rfid4 =
Router.get('/rfid1', (req,res)=>{
   res.send(rfid1);
   console.log(res);
});


 /* Router.post('/', (req,res)=>{
    const newTag = {
        epc : req.body.epc,
        antenna : req.body.Antenna,
        rssi : req.body.RSSI,    
        timestampreader :req.body.Timestamp,
        timestamprecv: current.getTime()
    };
    const {error, value} = tagreadSchema.validate(newTag,);
    if(error){
        console.log(error);
        return res.send("Échec, format des données invalide"); 
    }
    else{
        sql = 'INSERT INTO etk.tagread SET?'
        mysqlConnection.query(sql, newTag,(err, result)=>{
         if(!err){
            console.log(result);
            res.send('Données Enregistrées avec success...');
         }
         //throw err;
         else{
            console.log(err);
         }
         
    }); 
    }

    
});  */

module.exports = Router;