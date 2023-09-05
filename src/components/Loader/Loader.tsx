
import React, { FC } from "react";

import { LoaderIcon } from "../Icons/LoaderIcon";

import styles from './Loader.module.css'

export const Loader: FC = () => {

    return (
        <div className={styles.section}>
            <LoaderIcon />
        </div>
    )
}