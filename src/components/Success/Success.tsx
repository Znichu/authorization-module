import React from "react";
import {Result} from "antd";


export function Success() {
    return (
        <Result
            status="success"
            title= 'Check your email'
            subTitle="We've sent an email to ... . Click the link in the email to reset your password
            If you don't see the email, check other places it might be, like your junk, social, spam, or other folders."
        />
    )
}