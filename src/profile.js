import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tweet } from "react-twitter-widgets";
import { LinkedinProfile, TwitterTweet } from "react-social-plugins";
// import { TextHighlighter } from "react-highlight-textinput";

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%
    
`;

const SideBar = styled.div`
    background-color: grey;
    height: 100%;
    width: 200px;
    flex-grow: 1;
`;

const TweetContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: no-wrap;
    overflow-x: scroll;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 10px;
    flex-grow: 5;
`;

const SingleTweet = styled.div`
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

const SearchTerm = styled.div`
    font-size: 2rem;
    border-bottom: 1px solid rgb(221, 221, 221);
`;

const Highlight = styled.span`
    color: rgb(230, 30, 77);
`;

export default function MainChart() {

    const links = useSelector((state) => {
        console.log("links -> state.tweetdata", state.tweetdata);
        return state.tweetdata && state.tweetdata.tweetdata;
    });

    const requestData = useSelector((state) => {
        console.log("requestData -> state", state.currentsearch.keyword);
        return state.currentsearch && state.currentsearch.keyword;
    });
    
        
    
    if (!links) {
        return null;
    } else {
        console.log("links -> links", links);
        console.log("requestData -> requestData", requestData);
    }

    console.log("links", links);
    return (
        <ProfileContainer>
            <SideBar></SideBar>
            {/* <TextHighlighter search={requestData}> */}
            <TweetContainer>
                <SearchTerm>
                    Keyword: <Highlight>{requestData}</Highlight>
                </SearchTerm>
                {links &&
                    links.map((element, idx) => (
                        <SingleTweet key={idx}>
                            <Tweet
                                tweetId={element.tweet_id}
                                renderError={(_err) => (
                                    <p>Could not load tweet</p>
                                )}
                            />
                        </SingleTweet>
                        // <ExternalLink key={idx} href={element.link}>
                        //     <SingleTweet>
                        //         <blockquote className="twitter-tweet">
                        //             <p lang="en" dir="ltr">
                        //                 {element.tweet_text}
                        //             </p>
                        //             &mdash;
                        //             {Date.parse(element.created_at)}
                        //         </blockquote>{" "}
                        //         <script
                        //             async
                        //             src="https://platform.twitter.com/widgets.js"
                        //             charset="utf-8"
                        //         ></script>
                        //     </SingleTweet>
                        // </ExternalLink>
                    ))}
            </TweetContainer>
            {/* </TextHighlighter> */}
        </ProfileContainer>
    );

}