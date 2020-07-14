import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Plot from "react-plotly.js";

export default function MainChart() {
    const xaxis = useSelector((state) => {
        return state.chartdata && state.chartdata.data.x;
    });
    console.log("MainChart -> xaxis", xaxis);

    const yaxis = useSelector((state) => {
        return state.chartdata && state.chartdata.data.y;
    });
    console.log("MainChart -> yaxis", yaxis);

    if (!xaxis && !yaxis) {
        return null;
    }

    let chartData = [
        {
            x: xaxis,
            y: yaxis,
            type: "bar",
            marker: { color: "#ab63fa" },
            name: "Bar",
            orientation: "h",
        },
    ];
    // const [chartParameters, dispatchChartParameters] = useState(data);

    // const [chartParameters, dispatchChartParameters] = useReducer({
    //     data: [
    //         {
    //             x: xaxis,
    //             y: yaxis,
    //             type: "bar",
    //             marker: { color: "#ab63fa" },
    //             name: "Bar",
    //             orientation: "h",
    //         },
    //     ],
    //     layout: {
    //         plotBackground: "#f3f6fa",
    //         margin: { t: 0, r: 0, l: 20, b: 30 },
    //     },
    // });

    return (
        <Plot
            data={chartData}
            // layout={chartParameters.layout}
            // frames={this.state.frames}
            // config={this.state.config}
            // onInitialized={(figure) => this.setState(figure)}
            // onUpdate={(figure) => this.setState(figure)}
        />
    );
}
