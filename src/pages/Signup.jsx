import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Container = styled.div`
	padding: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(
			rgba(255, 255, 255, 0.4),
			rgba(255, 255, 255, 0.4)
		),
		url("https://images.pexels.com/photos/6984658/pexels-photo-6984658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
			center;
`;
const Wrapper = styled.div`
	display: flex;
	padding: 10px;
	justify-content: center;
	align-items: center;
	width: 70%;
	background-color: white;
	border-radius: 20px;
	box-shadow: 0 10px 15px black;
	flex-direction: column;
	${mobile({ width: "80vw" })}
`;

const Form = styled.form`
	width: 50vw;
	display: flex;
	flex-direction: column;
	${mobile({ width: "70vw" })}
`;
const Logo = styled.h1`
	color: teal;
	font-size: 50px;
	font-weight: 500;
	text-align: center;
	margin: 20px 0;
	${mobile({ fontSize: "40px" })}
`;
const Heading = styled.h1`
	margin: 10px;
	font-weight: 400;
	${mobile({ fontSize: "25px" })}
`;
const Input = styled.input`
	flex: 1;
	margin: 10px;
	padding: 10px;
	font-size: 20px;
	border: none;
	border-bottom: 1px solid black;
	outline: none;
	&:focus {
		font-weight: 400;
	}
`;

const Button = styled.button`
	margin: 10px 0;
	padding: 10px;
	font-weight: 400;
	background-color: teal;
	color: white;
	border: none;
	font-size: 20px;
`;
const Desc = styled.div`
	margin: 30px 0;
	font-weight: 300;
`;
const Options = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 20px 0;
	color: #27a465;
`;
const Register = styled.p`
	font-weight: 400;
`;
const ForgetPassword = styled.p`
	font-weight: 400;
`;

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const submitHandler = async (e) => {
		e.preventDefault();
		const user = { username, email, password };
		try {
			await publicRequest.post("/auth/register", user);
			toast.success("Registered successfully opening Login page");
			navigate("/login");
		} catch (err) {
			toast.error("Please use unique email, or go to login page");
			console.log(err);
		}
	};
	return (
		<Container>
			<Wrapper>
				<Form onSubmit={submitHandler}>
					<Logo>CROWN</Logo>
					<Heading>SIGN UP</Heading>
					<Input
						type="text"
						placeholder="Enter username "
						required
						onBlur={(e) => {
							setUsername(e.target.value);
						}}
					/>
					<Input
						type="email"
						placeholder="Enter Email"
						required
						onBlur={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<Input
						type="password"
						placeholder="Enter password"
						required
						onBlur={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<Button>REGISTER</Button>
					<Desc>
						By continuing, you agree to{" "}
						<b>
							Crown-Store Company’s Terms of Use and Privacy
							Policy.
						</b>
					</Desc>
					<Options>
						<Register>Sign In</Register>
						<ForgetPassword>Forget Password</ForgetPassword>
					</Options>
				</Form>
			</Wrapper>
		</Container>
	);
};
export default Signup;
