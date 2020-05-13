import React from 'react';

const Modal = ({onModal, show, text}) => {

    const clazz = 'modal ' + ( show ? 'show-modal': '');

    return (
        <div className={clazz} onClick={onModal}>
            <div className="modal-content">
                <span className="close-button">&times;</span>
                <h1>{text}</h1>
            </div>
        </div>
    )
};

export default Modal
