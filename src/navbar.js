import React, { useEffect, useRef, useClass, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div`
`;

const Input =styled.input``;

export default function Navbar() {
    const elemRef = useRef();

    const [values, setValues] = useState({});
    

    const handleChange = (e) => {
        e.preventDefault;
        
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
        console.log("Navbar -> values", values);
    };

    const submit = async (e) => {
        e.preventDefault;
        axios.post("/search",values).then(({data}) => {
            if (data.success) {
                console.log("data successfull submitted");
            } else {
                console.log("error:");
            }
        });
    };

    return (
        <Container>
            NAV CONTAINER
            <label htmlFor="keyword">Keyword</label>
            <Input
                onChange={handleChange}
                type="text"
                id="keyword"
                name="keyword"
                placeholder="Search Keyword"
                // ref={elemRef}
            ></Input>
            <label htmlFor="start">From</label>
            <Input
                onChange={handleChange}
                type="date"
                id="start"
                name="startdate"
                placeholder="Enter Start date"
                // ref={elemRef}
            ></Input>
            <label htmlFor="end">To</label>
            <Input
                onChange={handleChange}
                type="date"
                id="end"
                name="enddate"
                placeholder="Enter End date"
                // ref={elemRef}
            ></Input>
            <button onClick={submit}>Search</button>
        </Container>
    );
}
