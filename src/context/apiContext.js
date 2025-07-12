import { createContext, useContext } from "react";

export const ApiContext = createContext({
    fetchApiData: () => {},
    fetchMovieDetails: () => {},
})

export const ApiProvider = ApiContext.Provider

export default function  useApi() {
    return useContext(ApiProvider)
}
