/** @format */

import React, { useState } from "react"
import Layout from "../../components/layout"
import { useStoreContext } from "../../store"
import { login } from "../../utils/helpers.js/auth.helper"
import { Redirect } from "react-router-dom"

const Login = () => {
	const { store, setStore } = useStoreContext()
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	const [isLoading, setIsLoading] = useState(false)
	const [redirect, setRedirect] = useState(false)
	const [to, setTo] = useState(store?.order ? "/book" : "/services")

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleLogin = async (e) => {
		setIsLoading(true)
		e.preventDefault()
		const response = await login(formData)
		setIsLoading(false)
		if (response?.status === 201) {
			setStore({
				...store,
				accessToken: `bearer ${response.data.access_token}`,
				user: response.data.user,
				isLoggedIn: true,
			})
			if (response.data.user.Role === "Admin") {
				setTo("/admin/dashboard")
			}
			setRedirect(true)
		}
	}
	return redirect ? (
		<Redirect to={to} />
	) : (
		<Layout>
			<div className="flex justify-center">
				<form
					className="border  lg:w-1/3 md:w-1/2 w-10/12 p-8 space-y-4 rounded-lg shadow-sm"
					onSubmit={handleLogin}
				>
					<p className="text-center text-2xl font-bold">Login</p>
					<div>
						<p>Email Address</p>
						<input
							type="email"
							name="email"
							required
							placeholder="Email Address"
							style={{ backgroundColor: "#DFDFDF" }}
							className="pl-4 h-10 w-full focus:outline-none"
							onChange={handleChange}
							value={formData.email}
						/>
					</div>
					<div>
						<p>Password</p>
						<input
							type="password"
							name="password"
							required
							placeholder="Password"
							style={{ backgroundColor: "#DFDFDF" }}
							className="pl-4 h-10 w-full focus:outline-none"
							onChange={handleChange}
							value={formData.password}
						/>
					</div>
					<div className="flex justify-center items-center">
						{isLoading ? (
							<div className="lds-dual-ring" />
						) : (
							<input
								className={`flex justify-center items-center rounded p-1 px-3  cursor-pointer font-bold text-xl text-center`}
								type="submit"
								value="All Set"
								style={{ backgroundColor: "#0097D8" }}
							/>
						)}
					</div>
				</form>
			</div>
		</Layout>
	)
}

export default Login
