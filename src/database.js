const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');


const pool = mysql.createPool(database);
pool.getConnection((err,connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed');
            
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections');
        }
        if (err === 'ECONNREFUSED') {
            console.error('Connection was refused');
        }

        
        
    }
    if (connection) connection.release();
        console.log('Database is connected');
        return;


});

//Promisify pool query 

pool.query = promisify(pool.query);
module.exports = pool;
