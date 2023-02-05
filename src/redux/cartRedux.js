import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		amount: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			const itemInCart = state.products.find(
				(item) => item._id === action.payload._id
			);
			if (itemInCart) {
				toast.warn("Already Added");
			} else {
				state.quantity += 1;
				state.products.push(action.payload);
				state.amount += action.payload.price * action.payload.quantity;
				toast.success("Added to Cart");
			}
		},
		addQuantity: (state, action) => {
			const cartItem = state.products.find(
				(item) => item._id === action.payload._id
			);
			if (cartItem) {
				cartItem.quantity += 1;
				state.amount += cartItem.price;
			}
		},
		removeQuantity: (state, action) => {
			const cartItem = state.products.find(
				(item) => item._id === action.payload._id
			);
			if (cartItem) {
				if (cartItem.quantity > 1) {
					cartItem.quantity -= 1;
					state.amount -= cartItem.price;
				}
			}
		},
		removeProduct: (state, action) => {
			const removeItem = state.products.find(
				(item) => item._id === action.payload._id
			);
			if (removeItem) {
				const deductPrice = removeItem.quantity * removeItem.price;
				const cartItem = state.products.filter(
					(item) => item._id !== action.payload._id
				);
				state.products = cartItem;
				state.amount -= deductPrice;
				state.quantity--;
				toast.success("Item Removed ");
			}
		},
	},
});
export const { addProduct, removeProduct, addQuantity, removeQuantity } =
	cartSlice.actions;
export default cartSlice.reducer;
