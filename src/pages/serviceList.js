/** @format */

import React, { useState } from "react"
import Layout from "../components/layout"
import { serviceList } from "../utils/data"
import { Link } from "react-router-dom"
import { useStoreContext } from "../store"

const ServiceList = () => {
	const [hover, setHover] = useState(-1)
	const { store, setStore } = useStoreContext()

	const handleClick = (value) => {
		setStore({
			...store,
			activeService: value.service,
		})
	}

	return (
		<Layout showBg>
			<p className="lg:ml-32 md:ml-4 ml-2 mb-10 text-white text-sm font-bold ">
				please select a service
			</p>
			<div className="lg:px-32 md:px-4 px-2">
				{serviceList.map((value, index) => (
					<Link
						key={index}
						className="mb-4 border w-full flex"
						onMouseEnter={() => setHover(index)}
						onMouseLeave={() => setHover(-1)}
						onClick={() => handleClick(value)}
						to="/book"
					>
						<div
							style={{
								backgroundColor: hover === index ? value.color : "#fff",
							}}
							className="flex pl-10 items-center h-20 w-full"
						>
							<p className="md:text-3xl text-2xl font-bold text-center">
								{value.service}
							</p>
						</div>
					</Link>
				))}
			</div>
		</Layout>
	)
}

export default ServiceList
