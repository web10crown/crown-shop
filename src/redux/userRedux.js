import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		isFetching: false,
		isError: false,
	},
	reducers: {
		loginStart: (state) => {
			state.isFething = true;
		},
		loginSuccess: (state, action) => {
			state.user = action.payload;
			state.isFething = false;
			state.isError = false;
			toast.success(
				`Login Successfull welcome${action.payload.username}`
			);
		},
		loginError: (state) => {
			state.isFething = false;
			state.isError = true;
			setTimeout(
				toast.error(
					"Failed to login please fill right details or signup"
				),
				1000
			);
		},
		logOut: (state) => {
			if (state.user !== null) {
				state.user = null;
				toast.success("Logout Successfull");
			} else {
				toast.warn("please Login first");
			}
		},
	},
});
export const { loginStart, loginSuccess, loginError, logOut } =
	userSlice.actions;
export default userSlice.reducer;
