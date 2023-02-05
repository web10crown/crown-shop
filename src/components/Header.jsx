import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
	background-color: #829c9b;
	padding: 80px 60px;
	height: 300px;
`;
const Wrapper = styled.div`
	max-width: 1120px;
	margin: 0 auto;
`;
const Heading = styled.h1`
	font-family: "Lato", sans-serif;
	text-transform: uppercase;
	letter-spacing: 2px;
	font-size: 40px;
	font-weight: 300;
	line-height: 24px;
	color: #fff;
	margin: 0 auto;
	padding: 0 0 30px;
	text-align: center;
`;
const Tag = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	background: transparent;
	margin: 0 auto;
`;
const Content = styled.p`
	color: #fff;
	font-size: 4.2vw;
	padding: 10px;
	font-weight: 500;
	opacity: 0.3;
	text-align: center;
	transition: all 0.5s ease;
	&:hover {
		opacity: 1;
	}
	${mobile({ fontSize: "6vw" })}
`;
const Banner = styled.div`
	font-size: 25px;
	margin: 0 auto;
	text-align: center;
	color: white;
	margin-top: 50px;
`;
const Header = () => {
	return (
		<Container>
			<Wrapper>
				<Heading>My products</Heading>
				<Tag>
					<Link
						to="/products"
						state={{ cat: "men" }}
						style={{ color: "white" }}
					>
						<Content>MEN`S FASHION</Content>
					</Link>
					<Link
						to="/products"
						state={{ cat: "women" }}
						style={{ color: "white" }}
					>
						<Content>WOMEN`S FASHION</Content>
					</Link>
					<Link
						to="/products"
						state={{ cat: "kids" }}
						style={{ color: "white" }}
					>
						<Content>KIDS FASHION</Content>
					</Link>
				</Tag>
				<Banner> We sell quality clothes with better service </Banner>
			</Wrapper>
		</Container>
	);
};
export default Header;
