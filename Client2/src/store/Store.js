import {configureStore} from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import {pokemonApi} from "../Rtk/Rtkquery"
export const Store=configureStore({
    reducer:{
       [pokemonApi.reducerPath]:pokemonApi,
     },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(pokemonApi.middleware),

    
})

setupListeners(Store.dispatch)