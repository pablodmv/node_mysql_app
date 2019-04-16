const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/add', (req, res)=>{
    res.render('links/add');
});

router.post('/add', async (req,res)=>{
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };

    await pool.query('INSERT INTO links set ?', [newLink]);
    console.log(req.body);
    res.send("Correcto");
});

router.get('/list', async (req, res)=>{
    const result = await pool.query('SELECT * FROM links');
    console.log(result);
    res.send(result);

})


module.exports = router;