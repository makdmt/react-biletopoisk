import React, { FC, ReactPortal, ReactElement } from "react";
import ReactDOM from 'react-dom'

import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "../Icons/CloseIcon";
import { LayoutCommonBlock } from "../LayoutCommonBlock/LayoutCommonBlock";

import styles from './Modal.module.css'


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


  const rootHtml = document.getElementById('root') as HTMLElement;

  return ReactDOM.createPortal(
    (
      <div className={styles.modalScreen} onClick={(evt) => { evt.stopPropagation(); }} >
        <ModalOverlay onClick={closeByClickFunc} />
        <LayoutCommonBlock extraClass={styles.popupContainer} >
          <button type='button' title='закрыть' className={`${styles.closeBtn}`} onClick={closeByClickFunc}>
            <CloseIcon />
          </button>
          {children}
        </LayoutCommonBlock>
      </div>
    )
    , rootHtml);
}
