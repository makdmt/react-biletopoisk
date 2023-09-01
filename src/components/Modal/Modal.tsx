import React, { FC, ReactPortal, ReactElement } from "react";
import ReactDOM from 'react-dom'

import styles from './Modal.module.css'


interface IModal {
  closeByEscFunc?: (evt: React.KeyboardEvent) => void,
  closeByClickFunc?: (evt: React.MouseEvent<HTMLElement>) => void,
  closeByXFunc?: (evt: React.MouseEvent<HTMLButtonElement>) => void,
  children: ReactElement,
}

export const Modal = ({ closeByEscFunc, closeByClickFunc, closeByXFunc, children }: IModal): ReactPortal => {
  const rootHtml = document.getElementById('root') as HTMLElement;

  React.useEffect(() => {
    document.addEventListener("keydown", closeByEscFunc);
    return () => document.removeEventListener("keydown", closeByEscFunc);
  }, [])

  // return (
  //   <span>нету</span>
  // )


  return ReactDOM.createPortal(
    (
      <div className={styles.modalScreen} onClick={closeByClickFunc}>
        <div className={styles.popupContainer} >
          <button className={`${styles.closeBtn}`} onClick={closeByXFunc}></button>
          {children}
        </div>
      </div>
    )
    , rootHtml);
}
