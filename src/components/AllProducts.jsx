import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
	margin-top: 5px;
`;

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;
const Actions = styled.div`
	position: absolute;
	display: flex;
	width: 100%;
	justify-content: space-evenly;
	align-items: center;
	top: 0;
	bottom: 0;
	background-color: #0000005e;
	transition: all 0.5s ease;
	opacity: 0;
`;
const Product = styled.div`
	flex: 1;
	background-color: #daf2fa57;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	height: 350px;
	min-width: 300px;
	margin: 5px;
	&:hover ${Actions} {
		opacity: 1;
	}
`;

const Image = styled.img`
	height: 80%;
	max-width: 100%;
	object-fit: fit;
`;
const Details = styled.img`
	width: 40px;
	height: 40px;
	background-color: white;
	border-radius: 50%;
	padding: 5px;
	transition: all 0.3s ease;
	&:hover {
		transform: scale(1.1);
	}
`;
const Heart = styled.img`
	width: 40px;
	height: 40px;
	background-color: white;
	border-radius: 50%;
	padding: 5px;
	transition: all 0.3s ease;
	&:hover {
		transform: scale(1.1);
	}
`;
const Cart = styled.img`
	width: 40px;
	height: 40px;
	background-color: white;
	border-radius: 50%;
	padding: 5px;
	transition: all 0.3s ease;
	&:hover {
		transform: scale(1.1);
	}
`;
const AllProducts = () => {
	const products = useSelector((state) => state.products.products);
	return (
		<Container>
			<Wrapper>
				{products.map((p) => (
					<Product key={p._id}>
						<Actions>
							<Link to={`/product/${p._id}`}>
								<Details src="/assets/icons/lens-search.png" />
							</Link>
							<Heart src="/assets/icons/heart-fav.png" />
							<Cart src="/assets/icons/cart.png" />
						</Actions>
						<Image src={p.image} />
					</Product>
				))}
			</Wrapper>
		</Container>
	);
};
export default AllProducts;
