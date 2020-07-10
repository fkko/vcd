const express = require('express');
const app = express();
const compression = require('compression');
const Twitter = require("twitter");
const db = require("./db.js");
const tweets = require("./tweets");



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




app.get("/test", (req,res) => {
    console.log("test");
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
