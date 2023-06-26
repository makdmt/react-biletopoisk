'use client'

import React, { FC } from "react";

import { FilterCriteriaElement } from "../FilterCriteriaElement/FilterCriteriaElement";

import type { TFilterParams } from "@/services/types/data";


export const FilterCriteriaList: FC<{ categoryName: TFilterParams, categoryList: Array<[string, any]> }> = ({ categoryName, categoryList }) => {

    console.log(categoryList)

    return (
        <ul>
            {categoryList?.length > 0 && categoryList.map((item) => {
                return (
                    <FilterCriteriaElement key={item[0]} category={categoryName} criteriaInApi={item[0]} criteriaInDisplay={item[1]} />
                )
            })}
        </ul>
    )
}