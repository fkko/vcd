import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTweets } from "./actions";

const ChartContainer = styled.div`
    padding-left: 40px !important;
    padding-right: 40px !important;
`;

const Barchart = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: no-wrap;
    overflow-x: scroll;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 10px;
    
`;

const Bar = styled.div`
    background-color: rgb(230, 30, 77);
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    color: rgb(255, 255, 255);
    font-size: 1.5rem;
    padding-right: 10px;
    border-radius: 0px 12px 12px 0px;
`;

const ChartElement = styled.div`
    display: flex;
    flex-direction: flow;
    width: 100%;
    margin-bottom: 5px;
    border-radius: 12px;
`;

const Count = styled.div``;

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px solid rgb(230, 30, 77);
    border-radius: 12px 0px 0px 12px;
`;

const Fund = styled.div`
    font-size: 0.6rem;
    margin-bottom: 2px;
`;

const ScaledImage = styled.img`
    object-fit: cover;
    width: 100px;
    height: 100px;
    overflow: hidden;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
    margin: 5px;
`;

const Name = styled.div`
    
`;
export default function MainChart() {
    const dispatch = useDispatch();

    // const xaxis = useSelector((state) => {
    //     return state.chartdata && state.chartdata.data.x;
    // });
    // console.log("MainChart -> xaxis", xaxis);

    // const yaxis = useSelector((state) => {
    //     return state.chartdata && state.chartdata.data.y;
    // });
    // console.log("MainChart -> yaxis", yaxis);

    const dataObject = useSelector((state) => {
        return state.chartdata && state.chartdata.data.rows;
    });
    
    const requestData = useSelector((state) => {
        console.log("state:", state);
        return state && state.currentsearch;
    });
        
    if (!dataObject) {
        return null;
    } else {
        for (let i = 0; i < dataObject.length; i++) {
            dataObject[i].percentage =
                (dataObject[i].count / dataObject[0].count)*100 + "%";
        }
        console.log("keyword -> keyword", requestData);
    }

    

    console.log("dataObject########", dataObject);

    return (
        <ChartContainer>
            <Barchart>
                {dataObject &&
                    dataObject.map((element, idx) => (
                        <ChartElement key={idx}>
                            <Link
                                to={`/user/${element.user_id}`}
                                onClick={() => dispatch(getTweets(element.user_id, requestData))}
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                    flexGrow: 1,
                                }}
                            >
                                <Profile>
                                    <ScaledImage src={element.image_url} />
                                    <Name>{element.name}</Name>
                                    <Fund>{element.fund}</Fund>
                                </Profile>
                            </Link>
                            <Link
                                to={`/user/?id=${element.user_id}&q=${requestData.keyword}&start=${requestData.startdate}&end=${requestData.enddate}`}
                                onClick={() => dispatch(getTweets(requestData))}
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                    flexGrow: 7,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Bar
                                    style={{
                                        width: element.percentage,
                                    }}
                                >
                                    <Count>{element.count}</Count>
                                </Bar>
                            </Link>
                        </ChartElement>
                    ))}
            </Barchart>
        </ChartContainer>
    );
}



