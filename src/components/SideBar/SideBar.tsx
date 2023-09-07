'use client'

import React, { FC } from "react";

import { LayoutContext } from "@/app/layout";

import { LayoutCommonBlock } from "../LayoutCommonBlock/LayoutCommonBlock";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { CloseButton } from "../CloseButton/CloseButton";

import styles from './SideBar.module.css'

export const SideBar: FC<{ children: React.ReactNode }> = ({ children }) => {

    const { setPageWithSideBar, isSideBarStateVisible, hideSideBar } = React.useContext(LayoutContext);

    React.useLayoutEffect(() => {
        setPageWithSideBar(true);
        return () => {
            setPageWithSideBar(false);
        }
    })

    const hideSideBarByEsc = React.useCallback((evt: KeyboardEvent) => {
        evt.stopPropagation();
        evt.key === 'Escape' && hideSideBar();
    }, [])

    React.useEffect(() => {
        if (isSideBarStateVisible) {
            document.body.classList.add("no-scroll");
            document.addEventListener('keydown', hideSideBarByEsc);
        } else {
            document.body.classList.remove("no-scroll");
            document.removeEventListener('keydown', hideSideBarByEsc);
        }
        return () => document.removeEventListener('keydown', hideSideBarByEsc);
    }, [isSideBarStateVisible])


    return (
        <>
            {isSideBarStateVisible && <ModalOverlay appearance={'transparent'} />}
            <aside className={`${styles.section} ${isSideBarStateVisible ? styles.section_active : ''}`}>
                <LayoutCommonBlock extraClass={styles.underlay}>
                    {isSideBarStateVisible && <CloseButton type={'button'} onClick={() => hideSideBar()} />}
                    {children}
                </LayoutCommonBlock>
            </aside>
        </>
    )
}