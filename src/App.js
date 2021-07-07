/** @format */
import Router from "./router"
import { StoreProvider } from "./store"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
	return (
		<StoreProvider>
			<Router />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</StoreProvider>
	)
}

export default App
