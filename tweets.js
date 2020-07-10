const { key, secret, bearer, at, ats } = require("./secrets");
// const Twitter = require("twitter");
const Twit = require("twit");

module.exports.getTweets = async (list) => {

    var T =  await new Twit({
        consumer_key: key,
        consumer_secret: secret,
        access_token: at,
        access_token_secret: ats,
    });

    



    let tweetList = [];
    for (let i = 0; i < list.length; i++) {
        let params = { screen_name: list[i].twitter, count: 2 };
        console.log("params:", params);
        function gotData(err, data, response) {
            for (let j=0; j<data.length; j++) {
                let tweet_text = data[j].text;
                console.log("gotData -> tweet_text:::::", tweet_text);
                
                tweetList.push(tweet_text);
            }
        }
        T.get("statuses/user_timeline", params, gotData);
    }
    
    
    let tweetlist = await collectTweets();
    return { tweetlist };
    
    
};


// let tweetList = [];
// try {
//     for (let i = 0; i < list.length; i++) {
//         let params = { screen_name: list[i].twitter, count: 2 };
//         console.log("params:", params);
//         function gotData(err, data, response) {
//             for (let j = 0; j < data.length; j++) {
//                 let tweet_text = data[j].text;
//                 console.log("gotData -> tweet_text", tweet_text);

//                 tweetList.push(tweet_text);
//             }
//         }
//         T.get("statuses/user_timeline", params, gotData);
//     }
// } catch (err) {
//     console.log("ERROR IN tweets.js exported function", err);
// }

// const fn = async function () {
//     return { tweetList };
// };

// fn().then(function () {
//     console.log("tweetList:", tweetList);
// });

// T.get(
    //     "statuses/user_timeline",
    //     { screen_name: "aleximm", count: 1 },
    //     gotData
    // );

    // function gotData(err, data, response) {
    //     console.log("data[0].text:", data[0].text);
    // }
