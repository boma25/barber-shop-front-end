/** @format */

import AuthApi from "../../api/auth.routes"
import { toast } from "react-toastify"

const login = async ({ email, password }) => {
	let response
	try {
		response = await AuthApi.login({ email, password })
		toast.success("login successful")
		return response
	} catch (error) {
		response = error?.response?.data?.message || "network error"
		return toast.error(response)
	}
}

const signUp = async ({ email, password, first_name, last_name }) => {
	let response
	try {
		response = await AuthApi.signUp({ email, password, first_name, last_name })
		toast.success("signUp successful")
		return response
	} catch (error) {
		response = error?.response?.data?.message || "network error"
		return toast.error(response)
	}
}

export { login, signUp }
