import { Add, Remove, DeleteOutline } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
import { removeProduct, addQuantity, removeQuantity } from "../redux/cartRedux";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

const Wrapper = styled.div`
	padding: 20px;
	${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
	font-weight: 300;
	text-align: center;
`;

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;

const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${(props) => props.type === "filled" && "none"};
	background-color: ${(props) =>
		props.type === "filled" ? "teal" : "transparent"};
	color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
	${mobile({ display: "none" })}
`;
const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
	flex: 3;
`;
const ProductContainer = styled.div``;

const Product = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
	flex: 2;
	display: flex;
`;

const Image = styled.img`
	width: 200px;
`;

const Details = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ProductAmountContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const ProductAmount = styled.div`
	font-size: 24px;
	margin: 5px 15px;
`;
const Operation = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`;

const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 200;
`;

const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
	margin: 10px 0;
`;

const Summary = styled.div`
	flex: 1;
	max-height: 400px;
	border: 0.5px solid teal;
	border-radius: 10px;
	padding: 20px;
`;

const SummaryTitle = styled.h1`
	font-weight: 200;
`;

const SummaryItem = styled.div`
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === "total" && "500"};
	font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
	width: 100%;
	padding: 10px;
	background-color: teal;
	border: none;
	cursor: pointer;
	color: white;
	font-weight: 600;
`;

const Cart = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const data = cart.products;
	const [stripeToken, setToken] = useState(null);

	const handleClick = (_id) => {
		dispatch(removeProduct({ _id }));
	};
	const add = (_id) => {
		dispatch(addQuantity({ _id }));
	};
	const remove = (_id) => {
		dispatch(removeQuantity({ _id }));
	};

	// stripe payments strat here ==========>
	const STRIPE_KEY =
		"pk_test_51MXfm8FNTFHOTWb31k2zdQvpuAbqrQveOdmDtl1TIHpUN6IqYGVD6HKnBYlparLbeQjwTRk3hWTOcCoN2KmBgFDZ00t0vFdKcl";

	useEffect(() => {
		const payment = async () => {
			try {
				const res = await publicRequest.post("/payment/", {
					tokenId: stripeToken.id,
					amount: cart.amount * 100,
				});
				if (res.data.captured) {
					toast.success("payment successfull");
				}
			} catch (err) {
				toast.error("something went wrong ");
			}
		};
		if (stripeToken) {
			payment();
		}
	}, [stripeToken, cart.amount]);

	const checkoutHandler = (token) => {
		setToken(token);
	};
	return (
		<Wrapper>
			<Title>YOUR BAG</Title>
			<Top>
				<Link to="/products">
					<TopButton>CONTINUE SHOPPING</TopButton>
				</Link>
				<TopTexts>
					<TopText>Shopping Bag({cart.quantity})</TopText>
					<TopText>Your Wishlist (0)</TopText>
				</TopTexts>
				<StripeCheckout
					name="Crown-Shop"
					stripeKey={STRIPE_KEY}
					token={checkoutHandler}
					image="/assets/images/crown(1).png"
					amount={cart.amount * 100}
					currency="USD"
					shippingAddress
					billingAddress={false}
					email=""
				>
					<TopButton type="filled">CHECKOUT NOW</TopButton>
				</StripeCheckout>
			</Top>
			<Bottom>
				<Info>
					{data.map((p) => (
						<ProductContainer key={p._id}>
							<Product>
								<ProductDetail>
									<Image src={p.image} />
									<Details>
										<ProductName>
											<b>Product:</b>{" "}
											{p.name.toUpperCase()}
										</ProductName>
										<ProductColor color={p.colour} />
										<ProductSize>
											<b>Size:</b> {p.size}
										</ProductSize>
									</Details>
								</ProductDetail>
								<PriceDetail>
									<ProductAmountContainer>
										<Add
											onClick={() => add(p._id)}
											style={{ cursor: "pointer" }}
										/>
										<ProductAmount>
											{p.quantity}
										</ProductAmount>
										<Remove
											onClick={() => remove(p._id)}
											style={{ cursor: "pointer" }}
										/>
									</ProductAmountContainer>

									<Operation>
										<ProductPrice>
											$ {p.price * p.quantity}
										</ProductPrice>
										<DeleteOutline
											onClick={() => handleClick(p._id)}
											style={{
												color: "red",
												marginLeft: "15px",
												cursor: "pointer",
											}}
										/>
									</Operation>
								</PriceDetail>
							</Product>
							<Hr />
						</ProductContainer>
					))}
				</Info>
				<Summary>
					<SummaryTitle>ORDER SUMMARY</SummaryTitle>
					<SummaryItem>
						<SummaryItemText>Subtotal</SummaryItemText>
						<SummaryItemPrice>$ {cart.amount}</SummaryItemPrice>
					</SummaryItem>
					<SummaryItem>
						<SummaryItemText>Estimated Shipping</SummaryItemText>
						<SummaryItemPrice>$ 3.90</SummaryItemPrice>
					</SummaryItem>
					<SummaryItem>
						<SummaryItemText>Shipping Discount</SummaryItemText>
						<SummaryItemPrice>$ -3.90</SummaryItemPrice>
					</SummaryItem>
					<SummaryItem type="total">
						<SummaryItemText>Total</SummaryItemText>
						<SummaryItemPrice>$ {cart.amount}</SummaryItemPrice>
					</SummaryItem>

					<StripeCheckout
						name="Crown-Shop"
						stripeKey={STRIPE_KEY}
						token={checkoutHandler}
						image="/assets/images/crown(1).png"
						amount={cart.amount * 100}
						currency="USD"
						shippingAddress
						billingAddress={false}
						email=""
					>
						<Button>CHECKOUT NOW</Button>
					</StripeCheckout>
				</Summary>
			</Bottom>
		</Wrapper>
	);
};

export default Cart;
