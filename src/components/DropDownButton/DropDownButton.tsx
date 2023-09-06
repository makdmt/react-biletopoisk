import React, { FC } from "react";

import { DropDownIcon } from "../Icons/DropDownIcon";

import styles from './DropDownButton.module.css'

interface ICloseButton extends React.HTMLProps<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button' | undefined,
  isDropOpened: boolean,
  extraClass?: string
}


export const DropDownButton: FC<ICloseButton> = ({ type = 'button', isDropOpened, extraClass, ...props }) => {

  return (
    <button type={type} title={isDropOpened ? 'скрыть опции' : 'показать опции'} className={`${styles.toggleBtn} ${isDropOpened ? styles.toggleBtn_state_opened : ''} ${extraClass}`} {...props} >
      <DropDownIcon />
    </button>
  )
}
