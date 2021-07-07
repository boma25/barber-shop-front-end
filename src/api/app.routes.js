/** @format */

import instance from "./base"

const AppApi = {}

AppApi.book = async (data) => await instance.post("/user/book", data)

export default AppApi
