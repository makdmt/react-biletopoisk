'use client'

import React, { FC, RefObject } from "react";

import styles from './FilterFormTextInput.module.css'
import { useDebounce } from "@/hooks/useDebounce";


interface IFilterFormTextInput extends React.HTMLProps<HTMLInputElement> {
    extraClass?: string,
    debounceDelay?: number
}


export const FilterFormTextInput = React.forwardRef<HTMLInputElement | null, IFilterFormTextInput>(({ id, label, extraClass, debounceDelay = 0, onChange, ...props }, ref) => {

    const debouncedTyping = useDebounce(onChange, debounceDelay);

    return (
        <div className={extraClass}>
            <label className={styles.label} htmlFor={label} >{label}<br /></label>
            <input type='text' onChange={debounceDelay ? debouncedTyping : onChange} className={styles.input} id={label} ref={ref} {...props} ></input>
        </div>
    )
})