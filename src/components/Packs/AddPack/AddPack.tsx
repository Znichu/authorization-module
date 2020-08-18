import * as React from 'react';
import {Button, Modal} from "antd";
import {memo, useState} from "react";
import {AddPackForm} from "./AddPackForm/AddPackForm";

export const AddPack: React.FC = memo((props) => {

    const [visibleModal, setVisibleModal] = useState(false);
    const modalShowHide = () => setVisibleModal(!visibleModal);

    return (
        <>
            <Button type="primary" ghost onClick={modalShowHide}>Add</Button>
            <Modal visible={visibleModal}
                   title="Create a new card pack"
                   onCancel={modalShowHide}
                   footer={false}
            >
                <AddPackForm onCancel={modalShowHide}/>
            </Modal>
        </>
    )
});