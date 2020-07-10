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