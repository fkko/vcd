const express = require('express');
const app = express();
const compression = require('compression');
const Twitter = require("twitter");
const db = require("./db.js");
const tweets = require("./tweets");
var cron = require("node-cron");


app.use(compression());
app.use(express.json());
app.use(express.static("public"));

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


app.get("/vc/all", async function (req,res) {
    try {
        let { rows } = await db.getAllVCs();
        let data = await tweets.getTweets(rows);
        console.log("data in index", data);
       
        
        
        // res.json(rows);
    } catch (err) {
        console.log("Error in get all VCs:", err);
    }
});

// --> ON DEMAND API REQUEST FOR ALL USERS OF LIST
app.get("/daily", async function (req,res) {
    try {
        let { rows } = await db.getAllVCs();
        tweets.insertTweets(rows);
    } catch (err) {
        console.log("Error in daily insert:", err);
    }
});

// --> SCHEDULED API REQUEST FOR ALL USERS OF LIST EVERY 24h ---> will run every day at 12:00 AM
cron.schedule("0 0 0 * * *", async function () {
    try {
        let { rows } = await db.getAllVCs();
        tweets.insertTweets(rows);
        console.log("unsert success");
    } catch (err) {
        console.log("Error in daily insert:", err);
    }
});

app.post("/search", async (req,res) => {
    console.log("req.body", req.body);
    // ADJUST DATE FORMAT!!
    try {
        let { rows } = await db.getSelectedTweets(req.body.keyword, req.body.startdate, req.body.enddate);
        console.log("rows", rows);
        let xArray = [];
        let yArray = [];
        
        for (let i=0; i< rows.length; i++) {
            xArray.push(rows[i].count);
            yArray.push(rows[i].username);
        }
        console.log("xArray in index.js ", xArray);
        console.log("yArray in index.js ", yArray);

        res.json({
            x: xArray, 
            y: yArray
        });
        
    } catch (err) {
        console.log("err in /search", err);
    }

    
    
});




app.get("/test", (req,res) => {
    console.log("test");
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
