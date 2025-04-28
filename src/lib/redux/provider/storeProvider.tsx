'use client '

import { Provider } from 'react-redux'
import { store } from '../store/stores'


interface Props {
    children: React.ReactNode
}


export default function CustomProvider( { children }: Props ){
    return (
        <Provider store={store}> {children} </Provider>
    )
}
