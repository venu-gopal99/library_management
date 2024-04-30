
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query({
            query: () => `/users`,
        }),
        postMethod: builder.mutation({
            query: (data) => ({

                url: `/users`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: data
            })
        })
    }),
})


export const { useGetPokemonByNameQuery, usePostMethodMutation } = pokemonApi