/** @format */

import React, { useEffect, useState } from "react"
import Layout from "../../components/layout"
import {
	getAllBarbers,
	getAllBooks,
	updateBarber,
	createBarber,
} from "../../utils/helpers.js/admin.helper"
import moment from "moment"
import { Redirect } from "react-router-dom"
import { useStoreContext } from "../../store"
import { initialState } from "../../utils/helpers.js/store.helper"

const Admin = () => {
	const [barbers, setBarbers] = useState([])
	const [books, setBooks] = useState([])
	const [edit, setEdit] = useState(-1)
	const [formData, setFormData] = useState({})
	const [redirect, setRedirect] = useState(false)
	const { store, setStore, isLoggedIn } = useStoreContext()
	const [create, setCreate] = useState(false)

	useEffect(() => {
		if (!store?.user || store?.user?.Role !== "Admin") {
			setStore(initialState)
			setRedirect(true)
		}
		async function getData() {
			const books = await getAllBooks()
			const barbers = await getAllBarbers()
			console.log(books.data)
			if (books.status === 200 || barbers.status === 200) {
				setBooks(
					books.data.filter((value) => {
						let test = `${moment
							.duration(moment(value.date).diff(moment()))
							.days()}`
						return test[0] !== "-"
					})
				)
				return setBarbers(
					barbers.data.filter((value) => {
						let test = `${moment
							.duration(moment(value.date).diff(moment()))
							.days()}`
						return test[0] !== "-"
					})
				)
			}
			if (books === "Unauthorized") {
				setStore(initialState)
				setRedirect(true)
			}
		}
		isLoggedIn && getData()
		//eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (!isLoggedIn) {
			return setRedirect(true)
		}
	}, [isLoggedIn])

	const handleUpdate = async () => {
		const response = await updateBarber(formData)
		if (response === 200) {
			let temp = barbers
			temp.forEach((value, index) => {
				if (value._id === formData.id) {
					temp[index].number = formData.number
				}
			})
			setBarbers(temp)
			setEdit(-1)
		}
	}

	const handleClose = (data) => {
		setCreate(false)
		data && setBarbers(barbers.concat(data))
	}

	return redirect ? (
		<Redirect to="/login" />
	) : (
		<Layout>
			{create && <CreateBarber onClose={handleClose} />}
			<p className="text-3xl font-bold lg:pl-32 md:pl-4 pl-2">DashBoard</p>
			<div className="lg:px-32 md:px-4 px-2 lg:flex justify-between mt-12 h-96">
				<div className="shadow-sm lg:w-5/12 ">
					<div className="flex justify-between items-center cursor-pointer">
						<p className="text-xl font-bold mb-4">Barbers</p>
						<p
							className="text-blue-500 font-bold text-xs"
							onClick={() => setCreate(true)}
						>
							{" "}
							Create Barber
						</p>
					</div>
					<div className="overflow-auto h-5/6">
						{barbers
							?.sort((a, b) => new Date(a.date) - new Date(b.date))
							?.map((value, index) => (
								<div
									key={index}
									className="flex justify-between border px-4 items-center h-12 mb-4"
								>
									<div className="flex space-x-4">
										<p className="text-sm font-bold">{`${moment(
											value.date
										).format("ddd DD MMM YYYY ")}`}</p>
										<input
											readOnly={edit === index ? false : true}
											value={edit === index ? formData.number : value.number}
											onChange={(text) =>
												setFormData({
													id: value._id,
													number: text.target.value,
												})
											}
											className={`focus:outline-none ${
												index === edit && "border rounded pl-4 w-2/12"
											}`}
										/>
									</div>
									{index === edit ? (
										<p
											className="cursor-pointer text-xs font-bold pl-4"
											onClick={handleUpdate}
										>
											Save
										</p>
									) : (
										<p
											className="cursor-pointer text-xs font-bold pl-4"
											onClick={() => [
												setEdit(index),
												setFormData({ number: value.number }),
											]}
										>
											Edit
										</p>
									)}
								</div>
							))}
					</div>
				</div>
				<div className="shadow-sm lg:w-1/2 mt-10 lg:mt-0">
					<p className="text-xl font-bold mb-4">Booked</p>
					<div className="overflow-auto h-5/6">
						{books
							?.sort((a, b) => new Date(a.date) - new Date(b.date))
							?.map((value, index) => (
								<div
									key={index}
									className="flex justify-between border px-4 items-center h-12 mb-4"
								>
									<p className="text-sm font-bold">{`${moment(
										value.date
									).format("ddd DD MMM YYYY ")}`}</p>
									<p className="text-sm font-bold">
										{value.time}{" "}
										{` ${
											value.time.slice(0, value.time.indexOf(":")) < 8
												? "PM"
												: "AM"
										}`}
									</p>
									<p className="text-sm font-bold">
										{value.user.first_name} {value.user.last_name}
									</p>
									<p className="text-sm font-bold">{value.service}</p>
								</div>
							))}
					</div>
				</div>
			</div>
		</Layout>
	)
}

const CreateBarber = ({ onClose }) => {
	const [formData, setFormData] = useState({ date: "", number: "" })
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		const create = await createBarber(formData)
		if (create.status === 201) {
			onClose(formData)
			setFormData({})
		}

		setIsLoading(false)
	}
	return (
		<div className="flex justify-center">
			<form
				className="border  lg:w-1/3 md:w-1/2 w-10/12 p-8 space-y-4 rounded-lg shadow-sm absolute bg-white"
				onSubmit={handleSubmit}
			>
				<div className="w-full flex justify-end">
					<p onClick={onClose} className="cursor-pointer">
						x
					</p>
				</div>
				<p className="text-center text-2xl font-bold">Create Barber</p>
				<div>
					<p>Date</p>
					<input
						type="date"
						name="date"
						required
						placeholder="Date "
						style={{ backgroundColor: "#DFDFDF" }}
						className="pl-4 h-10 w-full focus:outline-none"
						onChange={handleChange}
						value={formData.email}
					/>
				</div>
				<div>
					<p>Number</p>
					<input
						type="number"
						name="number"
						required
						placeholder="number "
						style={{ backgroundColor: "#DFDFDF" }}
						className="pl-4 h-10 w-full focus:outline-none"
						onChange={handleChange}
						value={formData.email}
					/>
				</div>
				<div className="flex justify-center items-center">
					{isLoading ? (
						<div className="lds-dual-ring" />
					) : (
						<input
							className={`flex justify-center items-center rounded p-1 px-3  cursor-pointer font-bold text-xl text-center`}
							type="submit"
							value="Create"
							style={{ backgroundColor: "#0097D8" }}
						/>
					)}
				</div>
			</form>
		</div>
	)
}

export default Admin
