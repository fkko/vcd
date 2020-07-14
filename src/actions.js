import axios from "./axios";

export async function getChartData(values) {
    try {
        let data = await axios.post("/search",values);
        console.log("data in action: ", data);
        return {
            type: "GET_CHART_DATA",
            chartdata: data,
        }; 
    } catch (err) {
        console.log("ERROR in getChartData Action: ", err);
    }
}
