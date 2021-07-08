/** @format */

const axios = require("axios")

const instance = axios.create({
	baseURL:
		process.env.NODE_ENV === "development"
			? "http://localhost:5000/api/"
			: "https://barber-shop-back-end.herokuapp.com/api",
	withCredentials: true,
})

export default instance
