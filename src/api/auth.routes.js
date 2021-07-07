/** @format */

import instance from "./base"

const AuthApi = {}

AuthApi.login = async (data) => await instance.post("/auth/login", data)

AuthApi.signUp = async (data) => await instance.post("/auth/signUp", data)

export default AuthApi
