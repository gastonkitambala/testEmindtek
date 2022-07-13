const mysql = require('mysql2');
const express = require('express');
const Joi = require('joi');
const path = require('path');
const bodyParser =  require('body-parser');
const mysqlConnection = require('./connection');
const current = new Date();

//
const app = express();
app.use(bodyParser.json());

//Schéma/conditions pour lavalidation des données
const tagreadSchema = Joi.object({
    epc: Joi.string().pattern(/(E98A25)([0-9]|[A-F]|(\-)){10}((\d|\-){8})/).length(24).required(),
    antenna : Joi.number().min(1).max(4).required(),
    rssi : Joi.number().min(-70).max(0).required(),
    timestampreader : Joi.string().length(13).pattern(/\d{13}/).required(),
    timestamprecv: Joi.number(),
 });

//middleware
app.use('/public', express.static(path.join(__dirname, 'static'))); //dossier 'static' continet la page html pour le client
app.use(bodyParser.urlencoded({extended: false}));

//Appel API, envoi des données du lecteur RFID à travers un formulaire
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'static', 'rfidData.html'));
  
}); 

//Envoi des données de lecture RFID par méthode post
app.post('/',(req, res)=>{
    const tagRecu = req.body;
    console.log(tagRecu);
  
    //Contenu de la lecture & type casting nécessaire
    let newTag = {
        epc : tagRecu.EPC,
        antenna : Number(tagRecu.Antenna),
        rssi : Number(tagRecu.RSSI),    
        timestampreader :tagRecu.Timestamp,
        timestamprecv: current.getTime()
    };
    console.log(newTag);
  //Validation des données conténues dans la variable tagreadSchema par la librairie Joi
  const {error, value} = tagreadSchema.validate(newTag,);
    if(error)
    {
        console.log(error);
        console.log("Échec, format des données invalide");
        return res.send("Échec, format des données invalide"); 
       
    }
    else
    {
        //Conversion du champ timestampreader pour la sauvegarde dans la base des données
        newTag.timestampreader = Number(newTag.timestampreader); 
        sql = 'INSERT INTO etk.tagread SET?' //Reqûete SQL pour la sauvegarde des données
        mysqlConnection.query(sql, newTag,(err, result)=>{
         if(!err)
         {
            console.log(result);
            res.send('Données Enregistrées avec success...');
         }
         //throw err;
         else
         {
            console.log(err);
         }
         
      }); 
    } 
    let previousEpc = req.body.EPC;
    console.log(previousEpc);
});
let previous = Date.now()

 app.listen(3000)//le serveur utilise le port 3000(localhost:3000)