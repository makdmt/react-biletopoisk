import React, { FC, ReactPortal, ReactElement } from "react";
import ReactDOM from 'react-dom'

import { ModalOverlay } from "../ModalOverlay/ModalOverlay";

import styles from './Modal.module.css'
import { CloseButton } from "../CloseButton/CloseButton";


interface IModal {
  closeByEscFunc: (evt: KeyboardEvent) => void,
  closeByClickFunc?: React.MouseEventHandler<HTMLElement>,
  children: ReactElement,
}

export const Modal = ({ closeByEscFunc, closeByClickFunc, children }: IModal): ReactPortal => {

  React.useEffect(() => {
    document.addEventListener("keydown", closeByEscFunc);
    return () => document.removeEventListener("keydown", closeByEscFunc);
  }, [])


  const rootHtml = document.getElementById('modalRoot') as HTMLElement;

  return ReactDOM.createPortal(
    (
      <div className={styles.modalScreen} onClick={(evt) => { evt.stopPropagation(); }} >
        <ModalOverlay onClick={closeByClickFunc} />
        <div className={styles.popupContainer} >
          <CloseButton type='button' onClick={closeByClickFunc} />
          {children}
        </div>
      </div >
    )
    , rootHtml);
}
