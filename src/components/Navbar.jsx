import styled from "styled-components";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";

import { useState } from "react";

const Container = styled.div`
	height: 95px;
position:sticky;
top:0;
z-index:7;

`;
const Wrapper = styled.div`
	height: 70%;
	padding: 10px 20px;
	${mobile({ padding: "10px" })}
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: teal;
	box-shadow: 0 5px 10px gray;
`;
const Left = styled.div`
	flex: 1;
	color: white;
	${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
	border: 0.5px solid gray;
	padding: 5px;
	display: flex;
	align-items: center;
	background-color: white;
`;
const Input = styled.input`
	border: none;
	flex: 2;
	height: 35px;
	outline: none;
	font-size: 20px;
`;

const Center = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	${mobile({ justifyContent: "start" })};
`;
const Logo = styled.div`
	width: 40px;
	height: 40px;
	padding: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
	border-radius: 50%;
	${mobile({ width: "35px", height: "35px" })};
`;
const Img = styled.img`
	height: 90%;
	width: 90%;
	&:hover {
		transform: scale(1.1);
	}
`;
const Right = styled.div`
	flex: 1;
	color: white;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;
const Page = styled.p`
	margin: 0 10px;
	font-size: 20px;
	font-weight: 600;
	${mobile({ fontSize: "15px", margin: "0 5px" })}
	color: white;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;

const Navbar = () => {
	const quantity = useSelector((state) => state.cart.quantity);
	const [search, setSearch] = useState(null);

	return (
		<Container>
			<Wrapper>
				<Left>
					<SearchContainer>
						<Input
							placeholder="Search"
							type="text"
							onChange={(e) => {
								setSearch(e.target.value.toLowerCase());
							}}
						/>
						<Link to="/products" state={{ cat: search }}>
							<Search
								style={{
									color: "gray",
									fontSize: 30,
									cursor: "pointer",
								}}
							/>
						</Link>
					</SearchContainer>
				</Left>
				<Center>
					<Link to="/">
						<Logo>
							<Img src="/assets/images/crown(1).png" />
						</Logo>
					</Link>
				</Center>
				<Right>
					<Link to="/products" style={{ textDecoration: "none" }}>
						<Page>Products</Page>
					</Link>
					<Link to="/login" style={{ textDecoration: "none" }}>
						<Page>Login</Page>
					</Link>
					<Link to="/signup" style={{ textDecoration: "none" }}>
						<Page>Register</Page>
					</Link>

					<Badge
						badgeContent={quantity}
						color="primary"
						overlap="rectangular"
						style={{ cursor: "pointer", margin: "0 3px" }}
					>
						<Link to="/cart" style={{ color: "white" }}>
							<ShoppingCartOutlined />
						</Link>
					</Badge>
				</Right>
			</Wrapper>
		</Container>
	);
};
export default Navbar;
