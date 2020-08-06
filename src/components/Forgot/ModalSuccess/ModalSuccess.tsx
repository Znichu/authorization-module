import React from "react";
import {Modal} from "antd";


export function ModalSuccess() {
    Modal.success({
        title: 'Check your email',
        content: (
            <div>
                <p>We've sent an email to ... . Click the link in the email to reset your password</p>
                <p>If you don't see the email, check other places it might be, like your junk, social, spam, or other folders.</p>
            </div>
        ),
    })
}