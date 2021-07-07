/** @format */

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "../pages/auth/login"
import SignUp from "../pages/auth/signUp"
import Home from "../pages"
import Order from "../pages/order"
import ServiceList from "../pages/serviceList"
import Admin from "../pages/admin"

const RouterComponent = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/signUp" component={SignUp} />
				<Route path="/Book" component={Order} />
				<Route path="/services" component={ServiceList} />
				<Route path="/admin/dashboard" component={Admin} />
				<Route path="*" component={Home} />
			</Switch>
		</Router>
	)
}

export default RouterComponent
