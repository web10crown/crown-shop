import styled from "styled-components";
import { SettingsSharp } from "@material-ui/icons";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { logOut } from "../redux/userRedux";
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/productRedux";
import { publicRequest } from "../requestMethods";
import { toast } from "react-toastify";
import { useState } from "react";

const Container = styled.div`
	margin-top: 5px;
	background-image: url("/assets/images/footer.jpg");
	color: white;
	height: 450px;
	padding: 20px;
	font-size: 25px;
	font-weight: 200;
`;
const Wrapper = styled.div`
	padding: 20px;
	height: 95%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`;
const Top = styled.div``;
const Note = styled.p`
	margin-bottom: 20px;
	color: teal;
	${mobile({ marginBottom: "10px" })}
`;
const Heading = styled.h2`
	margin: 20px 0;
	font-weight: 500;
	${mobile({ fontSize: "30px", margin: "10px 0" })}
`;
const Feedback = styled.div`
	display: flex;
	background-color: white;
	width: 40vw;
	height: 40px;
	${mobile({ width: "70vw" })}
`;
const Input = styled.input`
	flex: 2;
	border: none;
	outline: none;
	padding: 5px;

	font-weight: 400;
`;
const Send = styled.img`
	width: 40px;
	height: 40px;
`;
const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	${mobile({ flexDirection: "column", alignItems: "flex-start" })}
`;
const Left = styled.div`
	flex: 2;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	margin-right: 20px;
	${mobile({ margin: "10px 0" })};
`;
const Logo = styled.div`
	font-weight: bold;
	font-weight: 500;
	font-size: 50px;
	${mobile({ fontSize: "30px" })}
	color: teal;
`;
const Lnote = styled.p`
	font-weight: 200;
	${mobile({ fontSize: "20px" })}
`;

const Center = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	${mobile({ margin: "10px 0" })};
`;
const Page = styled.p`
	text-decoration: none;
	font-weight: 500;
	color: white;
	cursor: pointer;
	margin-left: 40px;
	${mobile({ margin: "0", fontSize: "20px" })}
`;
const Right = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	${mobile({ margin: "10px 0" })};
`;
const Social = styled.h2`
	margin: 20px 0;
	font-weight: 600;
	${mobile({ margin: "5px 0", fontSize: "30px" })}
`;
const Accounts = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Icons = styled.img`
	width: 50px;
	height: 50px;
	margin-right: 20px;
	transition: all 0.3s ease;
	&:hover {
		transform: scale(1.1);
	}
	${mobile({ width: "40px", height: "40px" })}
`;

const Footer = () => {
	const [feedback, setFeedback] = useState(null);
	const dispatch = useDispatch();
	const getData = async () => {
		try {
			const res = await publicRequest.get("/products");
			dispatch(getProducts(res.data));
		} catch (err) {
			console.log(err);
		}
	};
	getData();
	const feedbackHandler = () => {
		if (feedback) {
			toast.success("Thanks for your feedback");
		} else {
			toast.warn("Write something");
		}
	};
	const handleLogout = () => {
		dispatch(logOut());
	};
	return (
		<Container>
			<Wrapper>
				<Top>
					<Note>No credit card required</Note>
					<Heading>HELP US TO IMPROVE</Heading>
					<Feedback>
						<Input
							placeholder="Send feedback here.. "
							onChange={(e) => setFeedback(e.target.value)}
						/>
						<Send
							onClick={feedbackHandler}
							src="/assets/icons/send-plane.png"
						/>
					</Feedback>
				</Top>
				<Bottom>
					<Left>
						<Logo>CROWN</Logo>
						<Lnote>
							Make the right data-driven decision that move your
							business
						</Lnote>
					</Left>
					<Center>
						<Link to="/products" style={{ textDecoration: "none" }}>
							<Page>Products</Page>
						</Link>
						<Link to="/login" style={{ textDecoration: "none" }}>
							<Page>Login</Page>
						</Link>
						<Link to="/signup" style={{ textDecoration: "none" }}>
							<Page>Register</Page>
						</Link>
						<Page onClick={handleLogout}>Logout</Page>
					</Center>
					<Right>
						<Social>Lets Chat</Social>
						<Accounts>
							<Link to="https://www.linkedin.com/in/neeraj-rana-387a53259" target="_blank">
								<Icons src="/assets/icons/linkedin.png" />
							</Link>
							<Link to="https://github.com/web10crown" target="_blank">
								<Icons src="/assets/icons/github.png" />
							</Link>
							<Link to="/">
								<Icons src="/assets/icons/telegram.png" />
							</Link>
							<Link to="/admin">
								<SettingsSharp
									style={{ color: "white", fontSize: "40px" }}
								/>
							</Link>
						</Accounts>
					</Right>
				</Bottom>
			</Wrapper>
		</Container>
	);
};
export default Footer;
