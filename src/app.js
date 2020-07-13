import React from "react";
import axios from "./axios";
import MainChart from "./mainchart";
import Navbar from "./navbar";
import { BrowserRouter, Route, Link } from "react-router-dom";
import styled from "styled-components";



export default function App() {


    return (
        <BrowserRouter>
            <h1> THIS IS THE MAIN COMPONENT</h1>
            <Navbar />


            <MainChart />
        </BrowserRouter>
    );
        

}