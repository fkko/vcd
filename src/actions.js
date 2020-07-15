import axios from "./axios";

export async function getChartData(values) {
    try {
        let data = await axios.post("/search",values);
        console.log("data in action: ", data);
        return {
            type: "GET_CHART_DATA",
            chartdata: data,
            currentsearch: values
        }; 
    } catch (err) {
        console.log("ERROR in getChartData Action: ", err);
    }
}

export async function getTweets(id, requestData) {
    try {
        let data = await axios.post(`/user/${id}`, requestData);
        console.log("data in action: ", data);
        return {
            type: "GET_TWEETS",
            tweetdata: data,
            requestdata: requestData
        };
    } catch (err) {
        console.log("ERROR in getTweets: ", err);
    }
}
