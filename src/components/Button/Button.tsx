import React, { FC } from "react";

import styles from './Button.module.css'

interface IButton extends React.HTMLProps<HTMLButtonElement> {
    type: 'submit' | 'reset' | 'button' | undefined,
    design: 'accept' | 'decline',
    label: string,
    extraClass?: string,
}

export const Button: FC<IButton> = ({ design, label, extraClass, children, ...props }) => {

    const typeClassname = design === 'accept' ? styles.yesButton : styles.noButton;


    return (
        <button className={`${styles.button} ${typeClassname} ${extraClass}`} {...props} >
            {label}
            {children}
        </button>
    )
}