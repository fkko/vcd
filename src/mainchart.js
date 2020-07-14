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
            name: "Bar",
            orientation: "h",
            text: xaxis.map(String),
            textposition: "auto",
            marker: {
                color: "rgb(158,202,225)",
                opacity: 0.6,
                line: {
                    color: "rgb(8,48,107)",
                    width: 1.5,
                },
            },
        },
    ];

    let layout = {
        xaxis: {
            title:
                "Number of tweets per VC in which keyword occurs in time range",
            titlefont: {
                size: 16,
                color: "rgb(107, 107, 107)",
            },
            tickfont: {
                size: 14,
                color: "rgb(107, 107, 107)",
            },
        },
        yaxis: {
            tickfont: {
                size: 14,
                color: "rgb(107, 107, 107)",
            },
        },
        plotBackground: "#f3f6fa",
        margin: { t: 100, r: 100, l: 150, b: 50 },
    };

    let config = {
        displayModeBar: false
    };
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
            layout={layout}
            // frames={this.state.frames}
            config={config}
            // onInitialized={(figure) => this.setState(figure)}
            // onUpdate={(figure) => this.setState(figure)}
        />
    );
}
