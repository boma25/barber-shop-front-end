/** @format */

const initialState = {
	isLoggedIn: false,
	activeService: "",
	accessToken: "",
}

const persistData = (data) => {
	window.localStorage.setItem("persist", JSON.stringify(data))
}

const getPersistedData = () =>
	JSON.parse(window?.localStorage?.getItem("persist")) || initialState

export { initialState, persistData, getPersistedData }
