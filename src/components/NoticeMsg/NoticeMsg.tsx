
import React, { FC } from "react";

import styles from './NoticeMsg.module.css'

export const NoticeMsg: FC<{ warningMsg: string, advice?: string }> = ({ warningMsg, advice }) => {

    return (
        <div className={styles.section}>
            <div className={styles.msgContainer}>
                <h2>{warningMsg}</h2>
                <p>{advice}</p>
            </div>
        </div>
    )
}