/** @format */

import React from "react"
import { Link, useLocation } from "react-router-dom"
import { navLinks } from "../utils/data"
import { useStoreContext } from "../store"
import { initialState } from "../utils/helpers.js/store.helper"

const Nav = () => {
	const { isLoggedIn, setStore } = useStoreContext()
	const { pathname } = useLocation()
	return (
		<nav
			style={{ backgroundColor: "#0097D8" }}
			className="flex justify-between items-center w-full lg:px-32 md:px-4  px-2 h-12"
		>
			<Link to="/">
				<p className="text-white text-xl font-bold">Barbershop</p>
			</Link>
			<div className="flex space-x-4 items-center">
				{!pathname.includes("/admin") &&
					(isLoggedIn ? (
						<Link to="/services">
							<p
								className="text-sm font-bold"
								style={{
									color:
										pathname === "/services" || pathname === "/book"
											? "#FFF"
											: "black",
								}}
							>
								Book
							</p>
						</Link>
					) : (
						<div className="flex">
							{navLinks.map((value, index) => (
								<Link key={index} to={value.route} className="mr-4">
									<p
										className="text-sm font-bold"
										style={{
											color: value.route === pathname ? "#FFF" : "black",
										}}
									>
										{value.name}
									</p>
								</Link>
							))}
						</div>
					))}
				{isLoggedIn && (
					<div
						onClick={() => setStore(initialState)}
						className="cursor-pointer"
					>
						<p
							className="text-sm font-bold"
							style={{
								color: "#FFF",
							}}
						>
							logout
						</p>
					</div>
				)}
			</div>
		</nav>
	)
}

export default Nav
