const sqlite3 = require('sqlite3').verbose();
/*var db = new sqlite3.Database('./AnDanlann.sqllite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the AnDanlann database.');
  });
  var db = new sqlite3.Database('AnDanlann.sqlite');
  */




    module.exports.createDB = function () {
        var db = new sqlite3.Database('AnDanlann.sqlite');
        return "Database created."
    }

    module.exports.createBookingTbl = function () {
        var db = new sqlite3.Database('AnDanlann.sqlite');
  
          db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS booking ( id TEXT, bookingDate NUMERIC, bookingTime TEXT, facility TEXT, name TEXT, PRIMARY KEY(id,facility,bookingDate,bookingTime) )");
        });
        db.close();
        return "Booking table created";
    }

    module.exports.createBooking = function (id, date, time, facility, name) {
        var db = new sqlite3.Database('AnDanlann.sqlite');
        
        db.serialize(() => {
            const sqlStmnt = db.prepare("INSERT INTO booking VALUES (?,?,?,?,?)");
            sqlStmnt.run(id, date, time, facility, name);
    
            sqlStmnt.finalize();
            });
        db.close();

            return "Booking "+id+" created";
    }

    module.exports.view = function () {
        var db = new sqlite3.Database('AnDanlann.sqlite');
        var tableName = "booking";
        var name = [];

        db.each("Select * FROM "+tableName+"",  async function (err, rows) {
            
        });
        

        return name[3];
    }





   
/*
    module.exports.createBasketTbl = function () {
        var db = new sqlite3.Database('AnDanlann.sqlite');
  
          db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS basketball ( date NUMERIC, timeSlot NUMERIC, facility TEXT, name TEXT, idNumber INTEGER, PRIMARY KEY(date,timeSlot) )");
        });
        db.close();
        return "Basketball table created";
    }*/

    module.exports.createCustomerTbl = function () {
        var db = new sqlite3.Database('AnDanlann.sqlite');

        db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS customer ( name TEXT, phoneNum INTEGER, idNum INTEGER, address TEXT, password TEXT, PRIMARY KEY(idNum,name) )");
        });
        db.close();
        return "Customer table created";
    }

    /*
    module.exports.createFootballTbl = function () {
        var db = new sqlite3.Database('AnDanlann.sqlite');
 
          db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS football ( date NUMERIC, timeSlot NUMERIC, facility TEXT, name TEXT, idNumber INTEGER, PRIMARY KEY(date,timeSlot) )");
        });
        db.close();
        return "Football table created";
    }

    module.exports.createGymTbl = function () {
        var db = new sqlite3.Database('AnDanlann.sqlite');
     
          db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS gym ( date NUMERIC, timeSlot NUMERIC, facility TEXT, name TEXT, idNumber INTEGER, PRIMARY KEY(date,timeSlot) )");
        });
        db.close();
        return "Gym table created";
    }

    

    module.exports.createFacilityTbl = function () {
        var db = new sqlite3.Database('AnDanlann.sqlite');
  
          db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS facilities ( facilityName TEXT, idNumber INTEGER, description TEXT, active INTEGER, PRIMARY KEY(idNumber,facilityName) )");
        });
        db.close();
        return "Facility table created";
    }*/
   
    /*
    module.exports.selectTable = function (tableName) {
        var db = new sqlite3.Database('AnDanlann.sqlite');
        var name = new Array();
        tableName = tableName.toLowerCase();
        //var name;
        db.serialize(() => {
        db.each("Select * FROM "+tableName+"",  (err, allrows) => {
            //console.log(`${allrows.name}`);
            allrows.forEach(function (row) {
                name.push(row.name);
            });
            //return allrows.name;
            //console.log(test.name);
            //callback(allrows);
    });
    });
        return name[1];
    
    db.close();
        
        function callback(allrows) {
            return `${name}`;
        }
        
    }*/
    


    /*
    module.exports.InsertBB = function (date, time, facility, name, idNumber) {
        var db = new sqlite3.Database('AnDanlann.sqlite');

        db.serialize(() => {
            db.run("INSERT INTO basketball VALUES  ( "+date+", "+time+", "+facility+", "+name+", "+idNumber+" )");
            });
            db.close();
    }*/

    /*
    let data = ['Ansi C', 'C'];
    let sql = `UPDATE langs
                SET name = ?
                WHERE name = ?`;
     
    db.run(sql, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) updated: ${this.changes}`);
     
    });*/

    module.exports.updateBooking = function (id, date, time, facility) {
        var db = new sqlite3.Database('AnDanlann.sqlite');    
        var inputData = [date, time, facility, id];

    db.run("UPDATE booking SET bookingDate=?, bookingTime=?, facility=? WHERE id=id",inputData,function(err,rows){
        
    });
    }

    module.exports.test = function (callback) {
          var sqlite3 = require('sqlite3').verbose();
          var db = new sqlite3.Database('test.db');
      
          db.get("SELECT * FROM booking",
                 function(err, row) {
            if (err)
              return callback(err);
      
            callback(null, name = row.name);
          });
        };



