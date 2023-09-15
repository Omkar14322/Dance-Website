const express = require("express");
const port = 80;
const path = require("path");
const app = express();
// const bodyparser = require("body-parser"); body-parser is an middleware.
const mongoose = require("mongoose");
mongoose.connect('mongodb://0.0.0.0:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    // name: String
    phone: String,
    email: String,
    Address: String,
    desc: String,
});

var Contact = mongoose.model('Contact', contactSchema);
// const fs = require("fs");

// app.use(express.static('static', options))
app.use('/static', express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views')) // set the view directory to use the template we write the template in the pug file.

//END-POINT
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);  //here we change the file name from index.pug to home.pug. to use the inheritence template.
})

app.get('/contact',(req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params); 
})

//if you want to do post with help of express then u have to install bodyparser module.
// if the user post its data and save it to database.
app.post('/contact',(req, res)=>{
    var myData = new Contact(req.body); //jo bhi data a rahi hai req se ussmai se data ko extract krke ek contact object bnalo
   //when data is saved with this it will return promisse,so to handle tha we write (.then) becz in the node it is asynchronous.
    myData.save().then(()=>{
        res.send("This item has been save to the database")
    }).catch(()=>{
        res.status(200).send("Item has not been saved")
    })
    // if it gives any error instaed of data save we write (.catch(()=>{})) this is syntax.
   // res.status(200).render('contact.pug', params); 
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`This application started successfully on port ${port}`);
})
