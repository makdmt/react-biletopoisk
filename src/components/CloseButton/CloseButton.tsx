import React, { FC } from "react";

import { CloseIcon } from "../Icons/CloseIcon";

import styles from './CloseButton.module.css'

interface ICloseButton extends React.HTMLProps<HTMLButtonElement> {
  type: 'submit' | 'reset' | 'button' | undefined,
  extraClass?: string
}


export const CloseButton: FC<ICloseButton> = ({ children, extraClass, ...props }) => {

  return (
    <button title='закрыть' className={`${styles.closeBtn} ${extraClass ? extraClass : ''}`} {...props}>
      <CloseIcon />
    </button>
  )
}
