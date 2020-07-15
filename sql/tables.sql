DROP TABLE IF EXISTS tweets;
DROP TABLE IF EXISTS vc_list;


CREATE TABLE vc_list(
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    fund VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    twitter VARCHAR(255) UNIQUE,
    linkedin VARCHAR(255),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tweets(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) REFERENCES vc_list(twitter),
    tweet_text VARCHAR(300) NOT NULL,
    created_at TIMESTAMP,
    link VARCHAR(300) NOT NULL UNIQUE
);

--  PREVIOUS: NOT NULL IN username