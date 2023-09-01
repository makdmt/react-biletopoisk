
import React, { FC } from "react";

import styles from './LayoutCommonBlock.module.css'

interface ILayoutCommonBlock {
    children: React.ReactNode,
    extraClass?: string
}

export const LayoutCommonBlock: FC<ILayoutCommonBlock> = ({ children, extraClass }) => {

    return (
        <div className={`${styles.section} ${extraClass}`}>
            {children}
        </div>
    )
}