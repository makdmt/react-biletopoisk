import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { selectItemAmount } from '../../redux/features/cart/selector';
import { cartActions } from "@/redux/features/cart";
import { Counter } from "../Counter/Counter";
import { Modal } from "../Modal/Modal";
import { ConfirmForm } from "../ConfirmForm/ConfirmForm";

import Image from "next/image";
import type { IFilmDetails } from "@/services/types/data";

import styles from './FilmListElement.module.css'
import { LayoutCommonBlock } from "../LayoutCommonBlock/LayoutCommonBlock";

export const FilmListElement: FC<IFilmDetails & { isRenderInCart: boolean }> = ({ id, title, genre, posterUrl, isRenderInCart }) => {

    const dispatch = useDispatch();
    const amount = useSelector((state) => selectItemAmount(state, id));
    const [modalOpened, setmodalOpened] = useState<boolean>(false);
    const router = useRouter();


    const openModal = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.stopPropagation();
        setmodalOpened(true);
    }

    const closeModalByClick = React.useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.stopPropagation();
        setmodalOpened(false);
    }, []);

    const closeModalByPressEsc = React.useCallback((evt: KeyboardEvent) => {
        evt.stopPropagation();
        evt.key === 'Escape' && setmodalOpened(false);
    }, [])

    const deleteFilmFromCart = React.useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.stopPropagation();
        dispatch(cartActions.delete(id));
    }, [id])

    const decrementHandler = React.useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.stopPropagation();
        amount > 1 ? dispatch(cartActions.decrement(id)) : setmodalOpened(true);
    }, [id, amount])


    return (
        <li className={styles.container} onClick={() => router.push(`details/${id}`)}>
            <LayoutCommonBlock extraClass={styles.section} >
                <div className={styles.imageContainer}>
                    <Image src={posterUrl} alt={title} width={100} height={120} loading='lazy' className={styles.image} />
                </div>
                <div className={styles.textBlock}>
                    <h2 className={styles.heading}>{title}</h2>
                    <p className={styles.genreInfo}>{genre}</p>
                </div>
                <div className={styles.counterContainer}>
                    <Counter filmId={id} extraDecrementHandler={isRenderInCart ? decrementHandler : undefined} />
                    {isRenderInCart && <button onClick={openModal}>delete</button>}
                </div>
                {modalOpened && <Modal closeByClickFunc={closeModalByClick} closeByEscFunc={closeModalByPressEsc} closeByXFunc={closeModalByClick} >
                    <ConfirmForm
                        heading="Удаление билета"
                        ask="Вы уверены, что хотите удалить билет?"
                        yesBtnFunc={deleteFilmFromCart}
                        noBtnFunc={closeModalByClick}
                    />
                </Modal>}
            </LayoutCommonBlock>
        </li>
    )
}