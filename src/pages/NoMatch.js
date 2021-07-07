import React from 'react'
import { PageTitleText , NotFound } from "../components/Layout";

export const NoMatch = () => (
    <div>
        <NotFound/>
        <PageTitleText>
            404 {'\n'} page not found
        </PageTitleText>
    </div>
)