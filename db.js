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
        SELECT CONCAT(vcl.first,' ',vcl.last) as name, vcl.image_url, vcl.fund, vcl.id AS user_id, COUNT(t.tweet_text) AS count
        FROM tweets AS t
        LEFT JOIN vc_list as vcl
        ON t.username = vcl.twitter
        WHERE lower(t.tweet_text) LIKE lower($1)
        AND DATE(t.created_at) BETWEEN $2 AND $3
        GROUP BY name, vcl.image_url, vcl.fund, user_id
        ORDER BY count DESC`,
    [`%${keyword}%`, startdate, enddate]);
};

module.exports.getSelectedTweetsPerUser = (keyword, id, start, end) => {
    return db.query(`
        SELECT t.username, t.created_at, t.link, t.created_at, t.tweet_text
        FROM tweets AS t
        LEFT JOIN vc_list as vcl
        ON t.username = vcl.twitter
        WHERE lower(t.tweet_text) LIKE lower($1)
        AND DATE(t.created_at) BETWEEN $3 AND $4
        AND vcl.id = $2
        ORDER BY t.created_at DESC`,
    [`%${keyword}%`, id, start, end]);
};