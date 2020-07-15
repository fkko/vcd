import React from "react";
import axios from "./axios";
import MainChart from "./mainchart";
import Profile from "./profile";
import Navbar from "./navbar";
import { BrowserRouter, Route, Link } from "react-router-dom";
import styled from "styled-components";

const Body = styled.div`
    font-family:  Roboto, Helvetica Neue, sans-serif;
    font-size: 14px;
    line-height: 1.43;
    color: #484848;
    background-color: #fff;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    height: 80px !important;
    left: 0px !important;
    width: 100% !important;
    z-index: 100 !important;
    background: rgb(255, 255, 255) !important;
    transition: box-shadow 0.3s cubic-bezier(0.35, 0, 0.65, 1) 0s !important;
    margin-bottom: 20px;
`;

const HeaderSubBox = styled.div`
    padding-left: 40px !important;
    padding-right: 40px !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Logo = styled.div`
    font-size: 2.5rem;
    font-weight: 1500 !important;
`;
const SubLogo = styled.div`
    font-size: 1rem;
`;

const DirectoryButton = styled.button`
    cursor: pointer !important;
    display: inline-block !important;
    position: relative !important;
    text-align: center !important;
    width: auto !important;
    touch-action: manipulation !important;
    font-family: BlinkMacSystemFont, Roboto,
        "Helvetica Neue", sans-serif !important;
    font-size: 16px !important;
    line-height: 20px !important;
    font-weight: 600 !important;
    padding-top: 14px !important;
    padding-bottom: 14px !important;
    padding-left: 24px !important;
    padding-right: 24px !important;
    color: rgb(255, 255, 255) !important;
    vertical-align: middle !important;
    white-space: nowrap !important;
    margin: 0px !important;
    text-decoration: none !important;
    border-radius: 8px !important;
    outline: none !important;
    transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s,
        -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s !important;
    border-width: initial !important;
    border-style: none !important;
    border-color: initial !important;
    border-image: initial !important;
    background: linear-gradient(
        to right,
        rgb(230, 30, 77) 0%,
        rgb(227, 28, 95) 50%,
        rgb(215, 4, 102) 100%
    ) !important;
`;

const NavbarContainerMain = styled.div`
    padding-left: 40px !important;
    padding-right: 40px !important;
`;

const NavbarContainerProfile = styled.div`
    padding-left: 300px !important;
    padding-right: 40px !important;
`;

export default function App() {


    return (
        <Body>
            <Header>
                <HeaderSubBox>
                    <LogoContainer>
                        <Logo>VC LEDGER</Logo>
                        <SubLogo>
                            What are VCs talking about on Twitter?
                        </SubLogo>
                    </LogoContainer>
                    <DirectoryButton>Full Directory</DirectoryButton>
                </HeaderSubBox>
            </Header>

            <BrowserRouter>
                <Route
                    path="/" 
                >
                    <NavbarContainerMain>
                        <Navbar />
                    </NavbarContainerMain>
                    <MainChart />
                </Route>
                <Route
                    path="/user/:id"
                >
                    <NavbarContainerProfile>
                        <Profile />
                    </NavbarContainerProfile>
                </Route>
            </BrowserRouter>
        </Body>
    );
        

}