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
    border-bottom: 1px solid rgb(221, 221, 221);
`;

const Tweet = styled.div`
    border-bottom: 1px solid rgb(221, 221, 221);
    width: 100%;
`;

const ExternalLink = styled.div`
    textDecoration: "none",
    color: "black"
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

const Fund = styled.div`
`;

const Name = styled.div``;

const TwitterHandle = styled.div`
`;

export default function MainChart() {

    const links = useSelector((state) => {
        console.log("links -> state.tweetdata", state.tweetdata);
        return state.tweetdata && state.tweetdata.tweetdata;
    });
        

    if (!links) {
        return null;
    } else {
        console.log("links -> links", links);
    }

    return (
        <ProfileContainer>
            <SideBar>
                <ScaledImage />
                <Name></Name>
                <Fund></Fund>
                <TwitterHandle></TwitterHandle>
            </SideBar>
            <TweetContainer>
                {links &&
                    links.map((element, idx) => (
                        <ExternalLink key={idx} href={element.link}>
                            <Tweet>
                                <blockquote className="twitter-tweet">
                                    <p lang="en" dir="ltr">
                                        {element.tweet_text}
                                    </p>
                                    &mdash;
                                    {Date.parse(element.created_at)}
                                </blockquote>{" "}
                                <script
                                    async
                                    src="https://platform.twitter.com/widgets.js"
                                    charset="utf-8"
                                ></script>
                            </Tweet>
                        </ExternalLink>
                    ))}
            </TweetContainer>
        </ProfileContainer>
    );

}