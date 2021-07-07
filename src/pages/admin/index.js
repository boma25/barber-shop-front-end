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

const Admin = () => {
	const [barbers, setBarbers] = useState([])
	const [books, setBooks] = useState([])
	const [edit, setEdit] = useState(-1)
	const [formData, setFormData] = useState({})

	useEffect(() => {
		async function getData() {
			const books = await getAllBooks()
			const barbers = await getAllBarbers()
			if (books.status === 200 || barbers.status === 200) {
				setBooks(books.data)
				setBarbers(barbers.data)
			}
		}

		getData()
	}, [])

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

	return (
		<Layout>
			<p className="text-3xl font-bold pl-32">DashBoard</p>
			<div className="px-32 flex justify-between mt-12 h-96">
				<div className="shadow-sm ">
					<p className="text-xl font-bold mb-4">Barbers</p>
					<div className="overflow-auto h-5/6">
						{barbers
							?.filter((value) => new Date(value.date) >= new Date())
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
				<div className="shadow-sm w-1/2">
					<p className="text-xl font-bold mb-4">Booked</p>
					<div className="overflow-auto h-5/6">
						{books
							?.filter((value) => new Date(value.date) >= new Date())
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

export default Admin
