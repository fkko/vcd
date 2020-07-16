const { key, secret, bearer, at, ats } = require("./secrets");
const { promisify } = require('util');
// const Twitter = require("twitter");
const Twit = require("twit");
const db = require("./db.js");
require("datejs");




// GET TWEETS AND PUTE THEM IN 
module.exports.getTweets = async (list) => {

    var T = new Twit({
        consumer_key: key,
        consumer_secret: secret,
        access_token: at,
        access_token_secret: ats,
    });

    let tweetList = [];
    // console.log("list",list);

    for (let i = 0; i < list.length; i++) {
        
        // TIME RANGE DEFINED IN PARAMS
        let params = { screen_name: list[i].twitter};
        console.log("params:", params);
        T.get("statuses/user_timeline", params)
            .then(function(result){
                // console.log("result.data:", result.data);
                var tweetsPerUser = [];
                for (let j = 0; j < result.data.length; j++) {
                    // if (result.data.created_at)
                    let tweet_text = result.data[j].text;
                    tweetsPerUser.push(tweet_text);
                }
                console.log("tweetsPerUser", tweetsPerUser);
                return tweetsPerUser;
            }).then((tweetsPerUser) => {
                let profile = {};
                profile.tweets = tweetsPerUser;
                profile.user = list[i].twitter;
                console.log("profile:", profile);
                return profile;
            }).then((profile) => {
                tweetList.push(profile);
                console.log("tweetList", tweetList);
            }).catch((err) => {
                console.log("err in catch:", err);
            });  
    }
    return(tweetList);  
};

// INSERT TWEETS
module.exports.insertTweets = async (list) => {

    var T = new Twit({
        consumer_key: key,
        consumer_secret: secret,
        access_token: at,
        access_token_secret: ats,
    });

    //CHANGE LATER - BACK TO GET TWEETS DAILY
    
    var currentDate = Date.parse(new Date());
    var formattedCurrentDate = currentDate.toString("dd-MM-yyyy");
    for (let i = 0; i < list.length; i++) {
        let params = { screen_name: list[i].twitter, count: 100 };
        T.get("statuses/user_timeline", params)
            .then(function (result) {
                for (let j=0; j<result.data.length; j++) {
                    // let tweetDate = Date.parse(result.data[j].created_at);
                    // let formattedTweetDate = tweetDate.toString("dd-MM-yyyy");


                    // if (formattedCurrentDate == formattedTweetDate) {
                    let link = `https://twitter.com/${params.screen_name}/status/${result.data[j].id_str}`;
                    console.log("link:", link);
                    db.insertTweet(
                        params.screen_name,
                        result.data[j].text,
                        result.data[j].created_at,
                        link,
                        result.data[j].id
                    );

                    // }
                }
                
            })
            .catch((err) => {
                console.log("err in catch:", err);
            });
    }

};