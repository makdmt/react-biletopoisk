
import React, { FC } from "react";

import styles from './LayoutCommonBlock.module.css'

interface ILayoutCommonBlock extends React.HTMLProps<HTMLDivElement>  {
    children: React.ReactNode,
    extraClass?: string
}

export const LayoutCommonBlock: FC<ILayoutCommonBlock> = ({ children, extraClass, ...props}) => {

    return (
        <div className={`${styles.section} ${extraClass}`} {...props}>
            {children}
        </div>
    )
}