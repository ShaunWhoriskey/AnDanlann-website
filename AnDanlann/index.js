const express =  require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require("body-parser");
const dbAdmin = require('./createTables');
const sqlite3 = require('sqlite3');
var shortid = require('shortid');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var username;
var facility;
var date;
var time;
var status = "Not Deleted"
var db = new sqlite3.Database('AnDanlann.sqlite');
var data = new Array();


//Get todays date stamp
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

//Generate id number
var ref = shortid.generate();



app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//app.use('/assets', express.static(__dirname + '/public'));


//Render the home hbs page

app.get('/home', (req, res) =>{
    res.render('home', {
        pageTitle: 'An Danlann'})
    });
       
        //Render the news hbs page
        app.get('/news', (req, res) =>{
            res.render('news', {
                pageTitle: 'Community Event News',
                date: today})
            });
            
            //Render the about hbs page
            app.get('/about', (req, res) =>{
                res.render('about', {
                    pageTitle: 'Visit An Danlann Today',
                    date: today})
                });
                
                //Render the createBooking hbs page
                app.get('/createBooking', (req, res) =>{
                    res.render('createBooking', {
                        pageTitle: 'Book Today',
                        date: today})
                    });
                    
                    //Render the viewBooking hbs page
                    app.get('/viewBooking', (req, res) =>{

                        db.all("SELECT * FROM booking", (err, rows) => {
                            data = rows;
                            console.log(data[1].facility);                   
                            res.render('viewBooking', {
                                pageTitle: 'View Bookings',
                                date: today,
                                row: data})
                                console.log(rows[0].name)
                                });
                        });
                        
                        //Render the delBooking hbs page
                        app.get('/delBooking', (req, res) =>{
                            res.render('delBooking', {
                                pageTitle: 'Cancel booking',
                                date: today})
                            });

                            //Render the delBooking hbs page
                            app.get('/updateBooking', (req, res) =>{
                                res.render('updateBooking', {
                                    pageTitle: 'Update Booking',
                                    date: today})
                                });

                                //Render the confirmation hbs page
                                app.get('/confirm', (req, res) =>{
                                    res.render('confirm', {
                                        pageTitle: 'Booking Confirmation',
                                        date: today,
                                        id: ref })
                                    });

                                     //Render booking updated page
                                    app.get('/update', (req, res) =>{
                                        res.render('update', {
                                            pageTitle: 'Booking Updated',
                                            date: today,
                                            id: ref,
                                            booking: facility,
                                            bookingDate: date,
                                            bookingTime: time })
                                        });

                                        //Render booking updated page
                                        app.get('/delete', (req, res) =>{
                                            res.render('delete', {
                                                pageTitle: 'Booking Deleted',
                                                confirm: status,
                                                date: today,
                                                id: ref })
                                            });

                                   

//include the CSS page within the public dir
app.get('/CSS/AnDanlann.css', (req, res) => { 
    res.send('CSS/AnDanlann.css') 
    res.end() });



    //Start Express
    app.listen(8080, (err) => {
        console.log('Express up at http://127.0.0.1:8080/home');
    });
    

//Create Customer Table
console.log(dbAdmin.createCustomerTbl());

//Create Facility Table
//console.log(dbAdmin.createFacilityTbl());

//Create Booking Table
console.log(dbAdmin.createBookingTbl());

    //post from create booking to insert data into the Database booking table
    app.post('/confirm',urlencodedParser, function(req,res){
    ref = shortid.generate();
    username=req.body.username;
    facility=req.body.facility;
    date= req.body.date;
    time=req.body.time;
    
    
    console.log("idNum = "+ref+", User name = "+username+", facility = "+facility+", date ="+date+", time = "+time+"");

    console.log(dbAdmin.createBooking(ref, date, time, facility, username));

    //idNum = shortid.generate();

    res.redirect('/confirm');
    
    });

        //post from update booking to update a field in the Database booking table
        app.post('/update',urlencodedParser, function(req,res){
            ref=req.body.ref;
            facility=req.body.facility;
            date=req.body.date;
            time=req.body.time;
            
            
            console.log("idNum = "+ref+", facility = "+facility+", date ="+date+", time = "+time+"");

            var inputData = [date, time, facility, ref];

            db.run("UPDATE booking SET bookingDate = ?, bookingTime = ?, facility = ? WHERE id = ?", [date, time, facility, ref], function (err,rows) {
                console.log("Updated")
            });

            res.redirect('/update');
            
            });

                //Post from delete Booking to delete field from the Database booking table
                app.post('/delete',urlencodedParser, function(req,res){
                    ref=req.body.ref;
                    var confirmation=req.body.yesDelete;

                    if (confirmation =! null){
                        status = "Deleted";
                    }
                    
                    
                    console.log("idNum = "+ref+", status = "+confirmation+"");
            
                    db.run("DELETE from booking WHERE id = ?", [ref], function (err,rows) {
                        console.log("Deleted")
                    });
            
                    res.redirect('/delete');
                    
                    });

        


