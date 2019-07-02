const dbAdmin = require('./createTables');

const sqlite3 = require('sqlite3').verbose();

/*let db = new sqlite3.Database('./AnDanlann.sqllite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the AnDanlann database.');
  });*/

console.log(dbAdmin.createDB());

console.log(dbAdmin.createBasketTbl());

console.log(dbAdmin.createCustomerTbl());

console.log(dbAdmin.createFootballTbl());

console.log(dbAdmin.createGymTbl());

console.log(dbAdmin.createBookingTbl());

var id = 1543345;
var date = 2018/12/10;
var time = "AM";
var place = "Gym";
var name = "test user";

console.log(dbAdmin.createBooking(id, date, time, place, name));

console.log(dmAdmin.updateBooking(id, date, time, place));

/*
console.log(dbAdmin.selectTable("gym"));*/
