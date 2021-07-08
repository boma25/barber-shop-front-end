/** @format */

import React, { useState } from "react"
import Layout from "../../components/layout"
import { Redirect } from "react-router-dom"
import { signUp } from "../../utils/helpers.js/auth.helper"
import { toast } from "react-toastify"

const SignUp = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		first_name: "",
		last_name: "",
		verify_password: "",
	})
	const [isLoading, setIsLoading] = useState(false)
	const [redirect, setRedirect] = useState(false)

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}
	const handleLogin = async (e) => {
		e.preventDefault()
		if (formData.password !== formData.verify_password) {
			return toast.error("password && verify password do not match")
		}
		if (formData.password.length < 6) {
			return toast.error("password is too short")
		}
		setIsLoading(true)
		const response = await signUp(formData)

		setIsLoading(false)
		if (response.status === 201) {
			setRedirect(true)
		}
	}
	return redirect ? (
		<Redirect to="/login" />
	) : (
		<Layout>
			<div className="flex justify-center">
				<form
					className="border  lg:w-1/3 md:w-1/2 w-10/12 p-8 space-y-4 rounded-lg shadow-sm"
					onSubmit={handleLogin}
				>
					<p className="text-center text-2xl font-bold">Sign Up</p>
					<div>
						<p>Name</p>
						<div className="flex justify-between">
							<input
								type="text"
								name="first_name"
								required
								placeholder="First Name"
								style={{ backgroundColor: "#DFDFDF" }}
								className="pl-4 h-10 w-1/2 focus:outline-none mr-1"
								onChange={handleChange}
								value={formData.first_name}
							/>
							<input
								type="text"
								name="last_name"
								required
								placeholder="Last Name"
								style={{ backgroundColor: "#DFDFDF" }}
								className="pl-4 h-10 w-1/2 focus:outline-none ml-1"
								onChange={handleChange}
								value={formData.last_name}
							/>
						</div>
					</div>
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
						<div className="flex justify-between">
							<input
								type="password"
								name="password"
								required
								placeholder="Password"
								style={{ backgroundColor: "#DFDFDF" }}
								className="pl-4 h-10 w-1/2 focus:outline-none mr-1"
								onChange={handleChange}
								value={formData.password}
							/>
							<input
								type="password"
								name="verify_password"
								required
								placeholder="Verify Password"
								style={{ backgroundColor: "#DFDFDF" }}
								className="pl-4 h-10 w-1/2 focus:outline-none ml-1"
								onChange={handleChange}
								value={formData.verify_password}
							/>
						</div>
					</div>
					<div className="flex justify-center items-center">
						{isLoading ? (
							<div className="lds-dual-ring" />
						) : (
							<input
								className={`flex justify-center items-center rounded p-1 px-3  cursor-pointer font-bold text-xl text-center`}
								type="submit"
								value="Lets Go"
								style={{ backgroundColor: "#0097D8" }}
							/>
						)}
					</div>
				</form>
			</div>
		</Layout>
	)
}

export default SignUp
