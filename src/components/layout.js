/** @format */

import React from "react"
import Nav from "./nav"

const Layout = ({ children }) => {
	return (
		<div>
			<Nav />
			<div className="pt-16">{children}</div>
		</div>
	)
}

export default Layout
