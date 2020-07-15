import React, { useEffect, useRef, useClass, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChartData } from "./actions";

const Container = styled.div`
    height: 70px !important;
    border: 1px solid rgb(176, 176, 176);
    border-radius: 12px;
    color: rgb(34, 34, 34);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px !important;
    display: flex;
`;


const InputContainer = styled.div`
    padding: 16px 24px !important;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgb(221, 221, 221) !important;
    flex-grow: 1;
`;

const InputContainerButton = styled.div`
    padding: 16px 24px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`;

const Label = styled.label`
    font-size: 10px !important;
    line-height: 12px !important;
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
    padding-bottom: 6px !important;
    text-transform: uppercase !important;
`;

const Input = styled.input`
    display: block !important;
    width: 100% !important;
    font-size: 14px !important;
    line-height: 18px !important;
    font-weight: 600 !important;
    color: rgb(34, 34, 34) !important;
    text-overflow: ellipsis !important;
    border-width: 0px !important;
    border-style: initial !important;
    border-color: initial !important;
    border-image: initial !important;
    margin: 0px !important;
    padding: 0px !important;
    background: none !important;
`;

const Button = styled.button`
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

export default function Navbar() {
    const elemRef = useRef();
    const dispatch = useDispatch();

    const [values, setValues] = useState({});
    

    const handleChange = (e) => {
        e.preventDefault;
        
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
        console.log("Navbar -> values", values);
    };

    // const submit = async (e) => {
    //     e.preventDefault;
    //     axios.post("/search",values).then(({data}) => {
    //         if (data.success) {
    //             console.log("data successfull submitted");
    //         } else {
    //             console.log("error:");
    //         }
    //     });
    // };

    

    return (
        <Container>
            <InputContainer>
                <Label htmlFor="keyword">Keyword</Label>
                <Input
                    onChange={handleChange}
                    type="text"
                    id="keyword"
                    name="keyword"
                    placeholder="Search Keyword"
                    // ref={elemRef}
                ></Input>
            </InputContainer>
            <InputContainer>
                <Label htmlFor="start">From</Label>
                <Input
                    onChange={handleChange}
                    type="date"
                    id="start"
                    name="startdate"
                    placeholder="Enter Start date"
                    // ref={elemRef}
                ></Input>
            </InputContainer>
            <InputContainer>
                <Label htmlFor="end">To</Label>
                <Input
                    onChange={handleChange}
                    type="date"
                    id="end"
                    name="enddate"
                    placeholder="Enter End date"
                    // ref={elemRef}
                ></Input>
            </InputContainer>
            <InputContainerButton>
                <Button onClick={() => dispatch(getChartData(values))}>
                    Search
                </Button>
            </InputContainerButton>
        </Container>
    );
}
