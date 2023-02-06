import styled from "styled-components";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/productRedux";
const Container = styled.div`
	width: 100%;
	height: 85vh;
	display: flex;
	position: relative;
	overflow: hidden;
	background-color: #fdecec;
	${mobile({ height: "80vh" })}
`;
const LeftArrow = styled.img`
	width: 40px;
	height: 40px;
	padding: 10px;
	z-index: 1;
	background-color: #ffffff63;
	border-radius: 50%;
	position: absolute;
	left: 20px;
	bottom: 20px;
	display: flex;
	transition: all 0.5 ease;
	&:hover {
		background-color: white;
		transform: scale(1.1);
	}
`;
const Wrapper = styled.div`
	display: flex;
	height: 100%;
	transition: all 0.7s ease;
	transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
	width: 100vw;
	height: 100%;
	display: flex;
	align-items: center;
`;
const Left = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Image = styled.img`
	max-height: 75vh;
	max-width: 95%;
	${mobile({ maxHeight: "55vh" })}
`;

const Right = styled.div`
	flex: 1;
	display: flex;
	padding: 20px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #fdecec;
	${mobile({ display: "none" })}
`;

const Heading = styled.h1`
	text-align: center;
	margin: 20px 0;
	font-weight: 400;
	font-size: 50px;
`;
const Description = styled.div`
	margin: 10px 0;
	font-size: 25px;
`;
const Button = styled.button`
	color: white;
	background-color: black;
	border: none;
	font-size: 20px;
	margin: 10px 0;
	padding: 10px;
	font-weight: 400;
`;
const RightArrow = styled.img`
	width: 40px;
	height: 40px;
	padding: 10px;
	background-color: #ffffff63;
	border-radius: 50%;
	position: absolute;
	right: 20px;
	bottom: 20px;
	z-index: 1;
	display: flex;
	transition: all 0.5 ease;
	&:hover {
		background-color: white;
		transform: scale(1.1);
	}
`;
const Crousal = () => {
	const [slideIndex, setIndex] = useState(0);
	const [products, setProducts] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await publicRequest.get("/products");
				setProducts(res.data);
				dispatch(getProducts(res.data));
			} catch (err) {
				console.log(err);
			}
		};
		getData();
	}, [dispatch]);

	const handleClick = (name) => {
		if (name === "right") {
			setIndex(slideIndex < 2 ? slideIndex + 1 : 0);
		} else {
			setIndex(slideIndex > 0 ? slideIndex - 1 : 2);
		}
	};
	useEffect(() => {
		const interval = setInterval(() => {
			setIndex(slideIndex < 2 ? slideIndex + 1 : 0);
		}, 5000);
		return () => clearInterval(interval);
	}, [slideIndex]);

	return (
		<Container>
			<LeftArrow
				slideIndex={slideIndex}
				src="assets/icons/left-arrow.png"
				onClick={() => {
					handleClick("left");
				}}
			/>
			<Wrapper slideIndex={slideIndex}>
				{products
					.slice()
					.reverse()
					.slice(0, 3)
					.map((p) => (
						<Slide key={p._id}>
							<Left>
								<Image src={p.image} />
							</Left>

							<Right>
								<Heading>{p.name.toUpperCase()}</Heading>
								<Description>
									{p.desc.slice(0, 150)} ...
								</Description>
								<Link to={`/product/${p._id}`}>
									<Button>Show Details</Button>
								</Link>
							</Right>
						</Slide>
					))}
			</Wrapper>
			<RightArrow
				slideIndex={slideIndex}
				src="assets/icons/right-arrow.png"
				onClick={() => {
					handleClick("right");
				}}
			/>
		</Container>
	);
};
export default Crousal;
