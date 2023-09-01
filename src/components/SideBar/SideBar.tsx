import React, { FC } from "react";

import styles from './SideBar.module.css'
import { LayoutContext } from "@/app/layout";

export const SideBar: FC<{ children: React.ReactNode }> = ({ children }) => {

    const { setPageWithSideBar, isSideBarStateVisible } = React.useContext(LayoutContext);

    React.useLayoutEffect(() => {
        setPageWithSideBar(true);
        return () => {
            setPageWithSideBar(false);
        }
    })

    React.useEffect(() => {
        isSideBarStateVisible ? document.body.classList.add("no-scroll") : document.body.classList.remove("no-scroll");
    }, [isSideBarStateVisible])


    return (
        <aside className={`${styles.section} ${isSideBarStateVisible ? styles.section_active : ''}`}>
            {children}
        </aside>
    )
}