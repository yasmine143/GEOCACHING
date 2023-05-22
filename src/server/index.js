const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Cache = require('./models/caches.model')
const jwt = require('jsonwebtoken');


app.use(cors());
app.use(express.json()); // Add this line to parse request body as JSON
mongoose.connect('mongodb://localhost:27017/Geocashing')


app.post('/api/register', async(req, res) => {
  console.log(req.body); // Log the request body to the console
  try{
    const user= await User.create({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: req.body.password,
    })
    res.json({status:'ok'});
    }
    catch(err){
        res.json({ status: 'error', error: 'Duplicate email' })
    }
   // Send a response indicating successful registration
});

app.post('/api/login', async(req, res) => {
    console.log(req.body); // Log the request body to the console
    
    const user= await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    const key = 'mostunsafekeyintheworldlol';
    if (user) {
        const token = jwt.sign(
			{
				pseudo: user.pseudo,
				email: user.email,
			},
			key
		)

        res.json({status:'ok', user:token});
    }
    else{
        res.json({status:'error', user:'false'});
    }
      
      

     // Send a response indicating successful registration
  });

app.post('/api/caches', async (req, res) => {
    console.log(req.body);
    try {
    
      const cache = await Cache.create(req.body);
      res.json({ status: 'ok', cache });
    } catch (err) {
      res.json({ status: 'error', error: err.message });
    }
});


// Get all caches
app.get('/api/caches', async (req, res) => {
    try {
      const caches = await Cache.find();
      res.json({ status: 'ok', caches });
    } catch (err) {
      res.json({ status: 'error', error: err.message });
    }
  });



app.listen(1337, () => {
  console.log('Server listening on port 1337');
});


