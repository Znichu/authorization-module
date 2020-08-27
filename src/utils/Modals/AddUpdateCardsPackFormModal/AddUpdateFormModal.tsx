import * as React from 'react';
import {Button, Modal} from "antd";
import {memo, ReactElement, useState} from "react";

export const AddUpdateFormModal = memo((props: any): ReactElement => {

    const {modalTitle, button} = props;

    const [visibleModal, setVisibleModal] = useState(false);
    const modalShowHide = () => setVisibleModal(!visibleModal);

    return (
        <>
            <Button {...button.params} onClick={modalShowHide}>{button.name}</Button>
            <Modal visible={visibleModal}
                   title={modalTitle}
                   onCancel={modalShowHide}
                   footer={false}
            >
                {props.children}
            </Modal>
        </>
    )
});