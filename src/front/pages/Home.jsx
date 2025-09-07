import React, { useEffect } from "react"

//hooks
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//components
import { UserPage } from "./UserPage.jsx";
import { GuestPage } from "./GuestPage.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<>
		{store.token ? <UserPage /> : <GuestPage />}
		</>
	);
}; 