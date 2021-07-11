/** @format */

import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { useStoreContext } from "../store"
import { serviceList, time } from "../utils/data"
import ButtonPrimary from "../components/button"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import moment from "moment"
import calenderImg from "../assets/calender.png"
import clockImg from "../assets/clock.png"
import { book } from "../utils/helpers.js/book.helper"
import { Redirect } from "react-router-dom"
import { toast } from "react-toastify"

const Order = () => {
	const { store, setStore, activeService, isLoggedIn } = useStoreContext()
	const [color, setColor] = useState("")
	const [hover, setHover] = useState(-1)
	const [isLoading, setIsLoading] = useState(false)
	const [redirect, setRedirect] = useState(false)
	const [to, setTo] = useState("/login")
	const [formData, setFormData] = useState(
		store?.order || {
			time: "8:00",
			date: new Date(),
			length: "",
		}
	)

	useEffect(() => {
		serviceList.forEach((value) => {
			if (value.service === activeService) {
				setColor(value.color)
				setFormData({
					...formData,
					length: value.time,
					service: value.service,
					user: store?.user?._id || "",
				})
			}
		})
		if (activeService === "") {
			setTo("/services")
			setRedirect(true)
		}
		// eslint-disable-next-line
	}, [])

	const handleChange = (value, field) => {
		setFormData({ ...formData, [field]: value })
	}

	const handleOrder = async () => {
		const test = `${moment
			.duration(moment(formData.date).diff(moment()))
			.days()}`
		if (test[0] === "-") {
			return toast.error("cant book a past date")
		}
		setIsLoading(true)
		setStore({ ...store, order: formData })
		const { order, ...rest } = store
		if (isLoggedIn && store.user.Role === "User") {
			const response = await book(formData)
			if (response.status === 201) {
				setTo("/")
				setStore(rest)
				return setRedirect(true)
			}
		} else {
			setRedirect(true)
		}
		setIsLoading(false)
	}

	return redirect ? (
		<Redirect to={to} />
	) : (
		<Layout>
			<p className="lg:ml-32  md:ml-4 ml-2 mb-4 text-sm font-semibold ">
				please select a date and time
			</p>
			<div className="md:flex justify-between lg:px-32 md:px-4 px-2">
				<div>
					<div className=" mb-4">
						<p className="text-xl font-semibold mb-2">Date</p>
						<Calendar
							onChange={(value) => handleChange(value, "date")}
							value={new Date(formData?.date)}
							className="md:ml-4"
						/>
					</div>
					<div className="border-t pt-4">
						<p className="text-xl font-semibold mb-2">Time</p>
						<div className="flex flex-wrap justify-between lg:w-7/12 md:ml-4">
							{time.map((value, index) => (
								<div
									key={index}
									className="rounded-full border h-7 w-16 flex justify-center items-center mb-4 cursor-pointer"
									onMouseEnter={() => setHover(index)}
									onMouseLeave={() => setHover(-1)}
									style={{
										backgroundColor:
											hover === index
												? color
												: formData.time === value
												? color
												: "transparent",
									}}
									onClick={() => handleChange(value, "time")}
								>
									<p className="text-sm font-semibold text-center">{value}</p>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="md:flex-none flex justify-center lg:w-1/3 md:w-5/12 w-full">
					<div className=" w-9/12 md:mt-0 mt-4">
						<div
							style={{ backgroundColor: color }}
							className="rounded-t-xl flex flex-col justify-center py-2 px-2"
						>
							<p className="text-sm font-semibold">Book summary</p>
							<p className="text-xs mt-1">Event details</p>
						</div>
						<div className="border-r border-l h-36 pt-8">
							<div className="flex items-center h-1/3 border-b border-t px-2">
								<img alt="clock" src={clockImg} className="w-4 h-4 mr-2" />
								<p className="text-xs">{formData.length}</p>
							</div>
							<div className="flex items-center h-1/3 border-b px-2">
								<img
									alt="calender"
									src={calenderImg}
									className="w-4 h-4 mr-2"
								/>{" "}
								<p className="text-xs">
									{`${moment(formData.date)
										.format("ddd, MMM DD YYYY")
										.toUpperCase()}`}{" "}
									{formData.time}
									{` ${
										formData.time.slice(0, formData.time.indexOf(":")) < 8
											? "PM"
											: "AM"
									}`}
								</p>
							</div>
						</div>
						<div
							style={{ backgroundColor: color }}
							className="rounded-b-xl flex justify-center items-center pt-3 pb-8"
						>
							{isLoading ? (
								<div className="lds-dual-ring-white " />
							) : (
								<ButtonPrimary
									text="Continue"
									backgroundColor="#fff"
									className="border w-10/12"
									onClick={handleOrder}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Order
