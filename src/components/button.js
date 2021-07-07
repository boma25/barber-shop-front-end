/** @format */

import React from "react"

const ButtonPrimary = ({ text, onClick, className, backgroundColor }) => {
	return (
		<div
			onClick={onClick}
			className={`flex justify-center items-center rounded p-1 px-3  cursor-pointer ${className}`}
			style={{ backgroundColor: backgroundColor || "#0097D8" }}
		>
			<p className="font-bold text-xl text-center">{text}</p>
		</div>
	)
}
export default ButtonPrimary
