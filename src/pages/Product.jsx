import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
	margin: 10px;
`;
const Wrapper = styled.div`
	display: flex;
	max-width: 100%;

	${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
	flex: 1;

	display: flex;
	justify-content: center;
	align-items: center;
`;
const Image = styled.img`
	height: 70vh;

	object-fit: cover;
	${mobile({ height: "40vh" })}
`;

const Right = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const Info = styled.div`
	padding: 20px;
`;
const Brand = styled.h1`
	font-size: 5.5vw;
	font-weight: 400;
	color: gray;
	${mobile({ fontSize: "8vw" })}
`;
const Desc = styled.p`
	margin: 20px 0;
	font-weight: 200;
	font-size: 20px;
`;
const Name = styled.h1`
	font-weight: 200;
`;
const Price = styled.h1`
	margin: 10px 0;
	font-weight: 200;
`;
const FilterContainer = styled.div`
	width: 50%;
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	${mobile({ width: "100%" })}
`;

const Filter = styled.div`
	display: flex;
	align-items: center;
`;

const FilterName = styled.span`
	font-size: 20px;
	font-weight: 200;
`;
const ColorDiv = styled.div`
	width: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	margin: 0px 5px;
	cursor: pointer;
	padding: 2px;
`;

const FilterColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
	cursor: pointer;
`;

const FilterSize = styled.select`
	margin-left: 10px;
	padding: 5px;
`;

const FilterSizeOption = styled.option``;
const Selector = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 20px 0;
	align-items: center;
`;
const QuantitySelector = styled.div`
	flex: 1;
	display: flex;
`;
const Quantity = styled.h1`
	width: 30px;
	height: 30px;
	padding: 5px;
	font-weight: 200;
	margin: 0 10px;
	border: 2px solid teal;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
`;
const Button = styled.button`
	margin: 0 30px;
	font-size: 20px;
	padding: 10px;
	background-color: #0f0f8e;
	color: white;
	border: none;
	cursor: pointer;
	border-radius: 5px;
`;

const Product = () => {
	const location = useLocation();
	const dispatch = useDispatch();

	const _id = location.pathname.split("/")[2];
	const products = useSelector((state) => state.products.products);
	const product = products.find((p) => p._id === _id);
	const price = product.price;

	// states====================================>
	const [quantity, setQuantity] = useState(1);
	const [size, setSize] = useState(product.size[0]);
	const [colour, setColour] = useState(product.colour);

	// colour handler ====================================>
	const colourHandler = (c) => {
		const prev = colour;
		setColour(c);
		const prevElement = document.getElementById(prev);
		if (prevElement) prevElement.style.border = "";
		const element = document.getElementById(c);
		if (element.style.border !== "") {
			element.style.border = "";
		} else {
			element.style.border = "solid gray";
		}
	};
	const submitHandler = () => {
		dispatch(addProduct({ ...product, price, size, colour, quantity }));
	};

	return (
		<Container>
			<Wrapper>
				<Left>
					<Image src={product.image} />
				</Left>
				<Right>
					<Info>
						<Brand>{product.brand.toUpperCase()}</Brand>
						<Desc>{product.desc.slice(0, 150)}...</Desc>
						<Name>{product.name}</Name>
						<Price>Price : $ {product.price}</Price>
						<FilterContainer>
							<Filter>
								<FilterName>Color</FilterName>
								{product.colour.map((c) => (
									<ColorDiv key={c} id={c}>
										<FilterColor
											color={c}
											onClick={() => colourHandler(c)}
										/>
									</ColorDiv>
								))}
							</Filter>
							<Filter>
								<FilterName>Size</FilterName>
								<FilterSize
									defaultValue="Size"
									onChange={(e) => {
										setSize(e.target.value);
									}}
								>
									<FilterSizeOption disabled>
										Size
									</FilterSizeOption>
									{product.size.map((s) => (
										<FilterSizeOption key={s}>
											{s}
										</FilterSizeOption>
									))}
								</FilterSize>
							</Filter>
						</FilterContainer>
						<Selector>
							<QuantitySelector>
								<Remove
									style={{
										cursor: "pointer",
										fontSize: "40px",
									}}
									onClick={() => {
										quantity > 1 &&
											setQuantity(quantity - 1);
									}}
								/>
								<Quantity>{quantity}</Quantity>
								<Add
									style={{
										cursor: "pointer",
										fontSize: "40px",
									}}
									onClick={() => {
										setQuantity(quantity + 1);
									}}
								/>
							</QuantitySelector>

							<Button onClick={submitHandler}>Add to cart</Button>
						</Selector>
					</Info>
				</Right>
			</Wrapper>
		</Container>
	);
};
export default Product;
