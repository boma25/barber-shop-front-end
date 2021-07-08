/** @format */

import AppApi from "../../api/app.routes"
import { toast } from "react-toastify"

const book = async ({ user, service, time, date }) => {
	let response
	try {
		response = await AppApi.book({ user, service, time, date })
		toast.success(response.data)
		console.log(response)
		return response
	} catch (error) {
		response = error?.response?.data?.message || "network error"
		toast.error(response)
		return false
	}
}

export { book }
