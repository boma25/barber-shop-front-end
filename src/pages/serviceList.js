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
		<Layout>
			<p className="ml-32 mb-10 text-sm font-semibold ">
				please select a service
			</p>
			<div className="px-32">
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
							style={{ backgroundColor: value.color }}
							className="flex justify-center items-center h-20 w-1/4"
						>
							<p className="text-white text-xl font-bold text-center">
								{value.time}
							</p>
						</div>
						<div
							style={{ backgroundColor: hover === index ? "#D6D4D4" : "#fff" }}
							className="flex pl-10 items-center h-20 w-3/4"
						>
							<p className="text-3xl font-bold text-center">{value.service}</p>
						</div>
					</Link>
				))}
			</div>
		</Layout>
	)
}

export default ServiceList
