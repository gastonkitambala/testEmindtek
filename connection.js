//Configuration de la connection avec BD MySQL
const mysql = require('mysql2'); //utilise la librairie MySql2
let mysqlConnection = mysql.createConnection({
    host : "localhost", //roule sur la machine locale 
    user : 'root', //nom d'utilisateur
    password : '1875Maman', //mot de passe  
    database : 'etk', //nom de la BD
    multipleStatements : true
});

//Connection 
mysqlConnection.connect((err)=>{
    if(!err)
    {
        console.log('Connection à la BD réussie');
    }
    else
    {
        console.log('La Connection à la DB a échoué, voir msg d\'erreur');
        console.log(err);
    }
});

module.exports = mysqlConnection;