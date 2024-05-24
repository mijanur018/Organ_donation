// const con = require('./connection')
const express = require('express')
const session =require('express-session')
const app = express()
const ejs = require('ejs')
const mysql = require('mysql')
const bodyparser = require('body-parser')
const connection = require('./db')
const { query } = require('express')
fileUpload = require('express-fileupload')
app.listen(3000)
app.set('view engine', 'ejs')
app.use(bodyparser.json())
app.use(express.urlencoded({extended: true}))
app.use(session({secret:'s'}))

app.use('/public', express.static('public'))
app.get('/', function(req, res) {
    res.render('index')
})
app.get('/donater_login', function(req, res) {
    res.render('donater_login') 
})
// app.get('/donater_login', function(req, res) {
//     // if(typeof req.query.s !='undefined' && req.query.s == 1 ){ 
//     //   res.render('donater_main_page',{data: req.query.s});
//     // }
//       res.render('donater_login');
//   })
  app.get('/donater_reg', function(req, res) {
    res.render('donater_reg')
  })
  app.post('/donater_reg', function(req, res) {
    console.log(req.body)
    var insertdata = {
      name:req.body.name,
      country:req.body.country,
      state:req.body.state,
      city:req.body.city,
      pin_no:req.body.pin_no,
      email:req.body.email,
      contact_no:req.body.contact_no,
      donated_organ:req.body.donated_organ +',',
      password:req.body.password,
   }
    console.log(insertdata)
  var query = `INSERT INTO donater SET ?`;
  connection.query(query,insertdata, function(error, rows){
   if(error) throw error
   else{
     res.redirect('/donater_main_page') 
   }
  })
  })
  
app.get('/donater_main_page', function(req, res) {
  var query = `SELECT * FROM organ_donation.organization`;
  // var query = `SELECT * FROM organ_donation.organ_donate`;
  connection.query(query, function(error, result){
    if (error){
      throw error
    }
    else {
      console.log(result);
      res.render('donater_main_page', { data: result });
    }
  });

})

app.post('/donater_main_page', function(req, res) {
  console.log(req.body)
  var insertdata = {
    height:req.body.height,
    weight:req.body.weight,
    blood_group:req.body.blood_group,
    allergies:req.body.allergies,
    medication_profile:req.body.medication_profile,
    health_status:req.body.health_status,
    hospitalization:req.body.hospitalization,
    medical_history:req.body.medical_history + ',',
    purpose:req.body.purpose + ',',
    acknowledgment:req.body.acknowledgment,
    adhaar_no:req.body.adhaar_no,
    file_name:req.body.file_name,
    // donater_id:req.body.donater_id,
    // file_location:req.body.file_location,
 }
  console.log(insertdata)
var query = `INSERT INTO organ_donate SET ?`;
connection.query(query,insertdata, function(error, rows){
 if(error) throw error
 else{
   res.redirect('/donater_login') 
 }

})
})

  

app.get('/org_login', function(req, res) {
  if(typeof req.query.s !='undefined' && req.query.s == 2 ){ 
    res.render('organization_main_page',{data: req.query.s});
    
  }
  res.render('org_login')
})  
app.get('/organ_reg', function(req, res) {
  res.render('organ_reg')
  })

  app.post('/organ_reg', function(req, res) {
    console.log(req.body)
    var insertdata = {
     name:req.body.name,
     email:req.body.email,
     organ:req.body.organ,
     contact_no:req.body.contact_no,
     govt_id:req.body.govt_id,
     country:req.body.country,
     state:req.body.state,
     city:req.body.city,
     pin_no:req.body.pin_no,
     password:req.body.password,
    
   }
    console.log(insertdata)
  var query = `INSERT INTO organization SET ?`;
  connection.query(query,insertdata, function(error, rows){
   if(error) throw error
   else{
     res.redirect('/organization_main_page') 
   }
  })
  })

  app.get('/organization_main_page', (req, res) => {
    const organ = req.query.donated_organ;
    const city = req.query.city;
    if (organ && city == false){
      const sql = `SELECT * FROM organ_donation.donater WHERE donated_organ Like '%${organ}%' `;
      connection.query(sql, (err, results) => {
        if (err) {
          console.error('Error executing query: ', err);
          return;
        }
        console.log(results);
        res.render('organization_main_page', { data: results });
      });
    }
    else if(organ == false && city){
      const sql = `SELECT * FROM organ_donation.donater WHERE city LIKE '%${city}%'`;
      connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        return;
      }
      console.log(results);
      res.render('organization_main_page', { data: results });
    });
    }
    else if(organ && city){
      const sql = `SELECT * FROM organ_donation.donater WHERE donated_organ Like '%${organ}%'and city LIKE '%${city}%'`;
      connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        return;
      }
      console.log(results);
      res.render('organization_main_page', { data: results });
    });
    }
    else{
      const sql = `SELECT * FROM organ_donation.donater`;
      connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        return;
      }
      console.log(results);
      res.render('organization_main_page', { data: results });
    });
    }
  });
  

app.get('/services', function(req, res) {
    res.render('services')
  })
app.get('/aboutus', function(req, res) 
 {
    res.render('aboutus')
})


app.post('/donater_login',function(req, res){
  var query= `select * from donater where email='`+req.body.email+`' and password='`+req.body.password+`'`;
  connection.query(query, function(error, rows){
    if(error) throw error
    else{
      if (rows.length!=0 ){
        req.session.login=1
        req.session.type=2
        res.redirect('/donater_main_page')
      }
      else{
        req.session.login=0
        req.session.type=0
        res.redirect('/donater_login')
      }
    }
  })
})


app.post('/org_login',function(req, res){
  var query= `select * from organization where email='`+req.body.email+`' and password='`+req.body.password+`'`;
  connection.query(query, function(error, rows){
    if(error) throw error
    else{
      if (rows.length!=0 ){
        req.session.login=1
        req.session.type=2
        res.redirect('/organization_main_page')
      }
      else{
        req.session.login=0
        req.session.type=0
        res.redirect('/org_login')
      }
    }
  })
})