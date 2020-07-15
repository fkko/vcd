import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%
    
`;

const SideBar = styled.div`
    background-color: grey;
    height: 100%;
    width: 200px;
`;

const TweetContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: no-wrap;
    overflow-x: scroll;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 10px;
`;

const Tweet = styled.div``;

export default function MainChart() {

    const links = useSelector((state) => {
        console.log("links -> state.tweetdata", state.tweetdata);
        return state.tweetdata && state.tweetdata;
    });
        

    if (!links) {
        return null;
    } else {
        console.log("links -> links", links);
    }

    return (
        <ProfileContainer>
            <SideBar></SideBar>
            <TweetContainer>
                {links &&
                    links.map((element, idx) => (
                        <Tweet key={idx}>
                            <blockquote className="twitter-tweet">
                                <p lang="en" dir="ltr">
                                    Hi 👋 RUNNERS WHO DONT WEAR MASKS !!!
                                    Talking to you! WEAR A MASK because you are
                                    running past us, sweating, huffing and
                                    puffing, not making any effort to maintain
                                    6ft of distance...it’s not safe what you are
                                    doing...and everyone you pass is secretly
                                    judging you...mmmmmmkkkk!?
                                </p>
                                &mdash; Phillipa Soo (@Phillipasoo){" "}
                                <a href="https://twitter.com/Phillipasoo/status/1282878425116692481?ref_src=twsrc%5Etfw">
                                    July 14, 2020
                                </a>
                            </blockquote>{" "}
                            <script
                                async
                                src="https://platform.twitter.com/widgets.js"
                                charset="utf-8"
                            ></script>
                        </Tweet>
                    ))}
            </TweetContainer>
        </ProfileContainer>
    );

}