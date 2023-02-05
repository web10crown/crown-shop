import Products from "../components/Products";
import AllProducts from "../components/AllProducts";
import Header from "../components/Header";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useLocation } from "react-router";

const Container = styled.div`
	margin: 5px 0;
	display: flex;
	flex-direction: column;
`;
const Heading = styled.h1`
	margin: 5px;
	font-size: 5vw;
	color: teal;
	${mobile({ fontSize: "9vw" })}
`;
const Wrapper = styled.div`
	margin: 40px 0;
	display: flex;
	justify-content: space-between;
`;
const Left = styled.div`
	display: flex;
	align-items: center;
	${mobile({ flexDirection: "column" })}
`;

const Select = styled.select`
	padding: 10px;
	font-size: 18px;
	width: 100px;
	margin: 0 10px;
	border: none;
	outline: none;
	background-color: teal;
	color: white;

	&:hover {
		transform: scale(1.1);
	}
	${mobile({ margin: "5px 5px" })}
`;
const Option = styled.option`
	background-color: black;
	border: none;
`;
const Right = styled.div`
	display: flex;
	align-items: center;
	${mobile({ flexDirection: "column" })}
`;

const ProductsPage = () => {
	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState("newest");
	const location = useLocation();
	const cat = location.state ? location.state.cat : null;

	const handleFilters = (e) => {
		const value = e.target.value;
		setFilters({
			...filters,
			[e.target.name]: value,
		});
	};

	return (
		<>
			<Container>
				<Heading>{cat ? cat.toUpperCase() : "PRODUCTS"} </Heading>
				<Wrapper>
					<Left>
						<Select
							name="colour"
							defaultValue="Colour"
							onChange={handleFilters}
						>
							<Option disabled>Colour</Option>
							<Option value="white">White</Option>
							<Option value="black">Black</Option>
							<Option value="red">Red</Option>
							<Option value="blue">Blue</Option>
							<Option value="yellow">Yellow</Option>
							<Option value="green">Green</Option>
						</Select>
						<Select
							name="size"
							defaultValue="Size"
							onChange={handleFilters}
						>
							<Option disabled>Size</Option>
							<Option>XS</Option>
							<Option>S</Option>
							<Option>M</Option>
							<Option>L</Option>
							<Option>XL</Option>
						</Select>
					</Left>
					<Right>
						<Select
							name="category"
							defaultValue="Gender"
							onChange={handleFilters}
						>
							<Option disabled>Gender</Option>
							<Option value="men">M</Option>
							<Option value="women">F</Option>
						</Select>
						<Select
							defaultValue="Price"
							onChange={(e) => setSort(e.target.value)}
						>
							<Option disabled>Price</Option>
							<Option value="asc">$ price-asc</Option>
							<Option value="desc">$ price-desc</Option>
						</Select>
					</Right>
				</Wrapper>
			</Container>
			<Products filters={filters} sort={sort} cat={cat} />
			<Header />
			<AllProducts />
		</>
	);
};
export default ProductsPage;
