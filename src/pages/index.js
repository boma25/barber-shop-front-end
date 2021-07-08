/** @format */

import React from "react"
import Layout from "../components/layout"
import landing from "../assets/landing.png"
import ButtonPrimary from "../components/button"
import { Link } from "react-router-dom"

const Home = () => {
	return (
		<Layout>
			<div
				style={{ background: `url(${landing})` }}
				className="w-full h-96 flex items-center justify-center flex-col bg-no-repeat bg-contain"
			>
				<p className="text-white text-sm font-semibold">
					EXPIRENCE THE ROYALTY
				</p>
				<p className="text-white text-4xl font-bold">
					THE BEST HAIRCUTS ON THE EAST COAST
				</p>
			</div>
			<div className="flex justify-end lg:px-32 md:px-4 px-2 mt-16">
				<Link to="/services">
					<ButtonPrimary text="Book" className="" />
				</Link>
			</div>
		</Layout>
	)
}

export default Home
