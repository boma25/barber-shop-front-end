/** @format */

import React, { useEffect } from "react"
import Nav from "./nav"
import { useStoreContext } from "../store"
import instance from "../api/base"
import landing from "../assets/bg.jpg"

const Layout = ({ children, showBg }) => {
	const { store } = useStoreContext()

	useEffect(
		() =>
			(instance.defaults.headers.common["Authorization"] = store.accessToken),
		//eslint-disable-next-line
		[]
	)
	return (
		<div
			style={{
				background: showBg && `url(${landing})`,
				minHeight: window.innerHeight,
				backgroundRepeat: "no-repeat",
				backgroundSize: `${window.innerWidth}px ${window.innerHeight}px`,
			}}
			className="w-full"
		>
			<Nav />
			<div className="pt-16">{children}</div>
		</div>
	)
}

export default Layout
