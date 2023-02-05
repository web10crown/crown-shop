import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
	margin: 5px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const Category = styled.div`
	flex: 1;
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 100%;
	${mobile({ padding: "1px" })}
`;
const Image = styled.img`
	height: 30vw;
	width: 32vw;
	object-fit: cover;
	${mobile({ height: "50vw" })}
`;
const Info = styled.div`
	color: white;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const Title = styled.h1`
	color: white;
	font-weight: 500;
	font-size: 6vw;
	text-shadow: 1px 1px gray;
`;
const Button = styled.button`
	border: none;
	padding: 10px;
	margin-top: 20px;
	background-color: white;
	color: gray;
	cursor: pointer;
	font-weight: 600;
	transition: all 0.3s ease;
	&:hover {
		transform: scale(1.1);
	}
	${mobile({ padding: "5px", marginTop: "5px" })}
`;
const Categories = () => {
	return (
		<Container>
			<Link to={`/products/`} state={{ cat: "jacket" }}>
				<Category>
					<Image src="/assets/images/server.jpg" />
					<Info>
						<Title>JACKET</Title>
						<Button>EXPLORE</Button>
					</Info>
				</Category>
			</Link>
			<Link to={`/products/`} state={{ cat: "jeans" }}>
				<Category>
					<Image src="/assets/images/jeans model.jpg" />
					<Info>
						<Title>JEANS</Title>
						<Button>EXPLORE</Button>
					</Info>
				</Category>
			</Link>
			<Link to={`/products/`} state={{ cat: "coat" }}>
				<Category>
					<Image src="/assets/images/coatmodel.jpg" />
					<Info>
						<Title>COAT</Title>
						<Button>EXPLORE</Button>
					</Info>
				</Category>
			</Link>
		</Container>
	);
};
export default Categories;
