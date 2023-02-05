import Crousal from "../components/Crousal";
import Header from "../components/Header";
import Products from "../components/Products";
import Categories from "../components/Categories";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
	const user = useSelector((state) => state.user.user);
	useEffect(() => {
		if (user) {
			toast.success(`Welcome Back ${user.username}`);
		} else {
			toast.success("Welcome User");
		}
	}, [user]);
	const filters = {};
	const sort = "newest";
	return (
		<>
			<Crousal />
			<Categories />
			<Header />

			<Products filters={filters} sort={sort} />
		</>
	);
};
export default Home;
