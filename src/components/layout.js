/** @format */

import React, { useEffect } from "react"
import Nav from "./nav"
import { useStoreContext } from "../store"
import instance from "../api/base"

const Layout = ({ children }) => {
	const { store } = useStoreContext()

	useEffect(
		() =>
			(instance.defaults.headers.common["Authorization"] = store.accessToken),
		//eslint-disable-next-line
		[]
	)
	return (
		<div>
			<Nav />
			<div className="pt-16">{children}</div>
		</div>
	)
}

export default Layout
