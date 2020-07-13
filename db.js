const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    let secrets = require("./secrets.json");
    var user = secrets.dbUser;
    var pass = secrets.dbPassword;
    db = spicedPg(`postgres:${user}:${pass}@localhost:5432/vcdata`);
}

module.exports.getAllVCs = () => {
    return db.query(`
    SELECT *
    FROM vc_list`);
};

module.exports.getVC = (id) => {
    return db.query(`
        SELECT *
        FROM vc_list
        WHERE id = $1`,
    [id]
    );
};

module.exports.insertTweet = (user, text, time, link) => {
    return db.query(`
        INSERT INTO tweets (username, tweet_text, created_at, link)
        VALUES ($1,$2,$3,$4)
        ON CONFLICT DO NOTHING`,
    [user, text, time, link]);
};

module.exports.getSelectedTweets = (keyword, startdate, enddate) => {
    return db.query(`
        SELECT * FROM tweets
        WHERE CHARINDEX($1, tweet_text) > 0
        AND created_at BETWEEN $2 AND $2`,
    [keyword, startdate, enddate]);
};