'use client'

import React, { FC, RefObject } from "react";

import styles from './FilterFormTextInput.module.css'
import { useDebounce } from "@/hooks/useDebounce";


interface IFilterFormTextInput extends React.HTMLProps<HTMLInputElement> {

    extraClass?: string,
    ref?: RefObject<HTMLInputElement>,
    isDebounced?: boolean
}


export const FilterFormTextInput: FC<IFilterFormTextInput> = ({ id, label, extraClass, ref, isDebounced = false, onChange, ...props }) => {

    const debouncedTyping = useDebounce(onChange, 300);

    return (
        <div className={extraClass}>
            <label className={styles.label} htmlFor={label} >{label}<br /></label>
            <input type='text' onChange={isDebounced ? debouncedTyping : onChange} className={styles.input} id={label} ref={ref} {...props} />
        </div>
    )


}