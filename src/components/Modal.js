import React from 'react';

import styled from 'styled-components';

const StyledModal = styled.div`
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transform: scale(1.1);
  transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
}
.modal-content {
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem 1.5rem;
  height: 5rem;
  width: 32rem;
  border-radius: 0.5rem;
}
.close-button {
  float: right;
  width: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  cursor: pointer;
  border-radius: 0.25rem;
  background-color: lightgray;
}
.close-button:hover {
  background-color: darkgray;
}
.show-modal {
  opacity: 1;
  visibility: visible;
  transform: scale(1.0);
  transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
}
`;


const Modal = ({onModal, show, text}) => {

    const clazz = 'modal ' + (show ? 'show-modal' : '');

    return (
        <StyledModal>
            <div className={clazz} onClick={onModal}>
                <div className="modal-content">
                    <span className="close-button">&times;</span>
                    <h1>{text}</h1>
                </div>
            </div>
        </StyledModal>
    )
};

export default Modal
