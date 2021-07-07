/** @format */

import instance from "./base"

const AdminApi = {}

AdminApi.getAllBooks = async () => await instance.get("/admin/get-all-books")

AdminApi.getAllBarbers = async () =>
	await instance.get("/admin/get-all-barbers")

AdminApi.createBarber = async (data) =>
	await instance.post("/admin/create-barber", data)

AdminApi.updateBarber = async (id, data) =>
	await instance.put(`/admin/update-barber/${id}`, data)

export default AdminApi
