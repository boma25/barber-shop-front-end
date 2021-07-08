/** @format */

import AdminApi from "../../api/admin.routes"
import { toast } from "react-toastify"

const createBarber = async ({ date, number }) => {
	let response
	try {
		response = await AdminApi.createBarber({ date, number })
		toast.success(response.data)
		return response
	} catch (error) {
		response = error?.response?.data?.message || "network error"
		return toast.error(response)
	}
}

const updateBarber = async ({ id, number }) => {
	let response
	try {
		response = await AdminApi.updateBarber(id, { number })
		toast.success(response.data)
		return response.status
	} catch (error) {
		response = error?.response?.data?.message || "network error"
		return toast.error(response)
	}
}

const getAllBarbers = async () => {
	let response
	try {
		response = await AdminApi.getAllBarbers()
		return response
	} catch (error) {
		response = error?.response?.data?.message || "network error"
		toast.error(response)
		return response
	}
}
const getAllBooks = async () => {
	let response
	try {
		response = await AdminApi.getAllBooks()
		return response
	} catch (error) {
		response = error?.response?.data?.message || "network error"
		toast.error(response)
		return response
	}
}
export { createBarber, updateBarber, getAllBarbers, getAllBooks }
