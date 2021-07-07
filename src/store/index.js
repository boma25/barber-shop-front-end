/** @format */

import { useContext, createContext, useEffect, useState } from "react"
import { getPersistedData, persistData } from "../utils/helpers.js/store.helper"

const StoreContext = createContext(null)

const StoreProvider = ({ children }) => {
	const [store, setStore] = useState(getPersistedData())

	useEffect(() => {
		persistData(store)
	}, [store])
	return (
		<StoreContext.Provider value={{ ...store, setStore, store }}>
			{children}
		</StoreContext.Provider>
	)
}

const useStoreContext = () => useContext(StoreContext)

export { useStoreContext, StoreProvider }
