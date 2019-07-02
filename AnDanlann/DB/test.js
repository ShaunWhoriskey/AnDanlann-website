const sqlite3 = require('sqlite3').verbose();
const dbAdmin = require('../createTables');
const promise = require('promise');

var tableName = "booking";
var test;
var name = new Array();


var db = new sqlite3.Database('AnDanlann.sqlite');

let sql = 'Select * FROM booking';

//dbAdmin.test();


db.all("SELECT * FROM booking", (err, rows) => {
        name = rows;
        //rows.forEach( row => {
            //name.push(console.log(`${row.name}`));

   // })
    console.log(name[2].facility);
});


//console.log(name[2].facility);

/*
db.query("SELECT * FROM booking", function (name) {
    console.log(name.length)
});*/





/*
function viewName (callback) {
    var sql = 'Select * FROM booking';

    db.all(sql, (err, rows) => {
        if(err) {
            throw err;
        }
            name = new Array();
            //console.log(rows.length);
            for(var i=0; i<=rows.length; i++){
                //name[i] = rows[i].name;
                callback(name.push(rows[i].name));
                //console.log(name.length);

            }
            //callback(rows.name);
        return name;
});
}

function print (name) {
    console.log(name);
}
viewName(print);*/


/*
db.all(sql, [], (err, rows) => {
    if(err) {
        throw err;
    }
    rows.forEach(async function (row) {
        console.log(row.name);
        name.push(row.name);
    })
})

console.log(name[0]);*/


 /*       
        tableName = tableName.toLowerCase();
        db.serialize(() => {
        db.each("Select * FROM booking",  async function (err, row) {
            console.log(`${row.length}`);
            //name.push(`${allrows.name}`);
            for(var i=0; i<=3; i++) {
                name[i] = await row.name;
            }

    });
        });
        db.close();

        console.log(name.length);*/




/*
    var db = new sqlite3.Database('AnDanlann.sqlite');
    var date = "111218";
    var time = "1200";
    var facility = "BB";
    var name = "Kathy Diver";
    var idNumber = "L00120513";
    db.serialize(() => {
        const sqlStmnt = db.prepare("INSERT INTO basketball VALUES (?,?,?,?,?)");
        sqlStmnt.run(date, time, facility, name, idNumber);

        sqlStmnt.finalize();
        });
    db.close();*/

//console.log(""+dbAdmin.view());