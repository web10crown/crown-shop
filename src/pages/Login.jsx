import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { loginStart, loginSuccess, loginError } from "../redux/userRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40px;
	background: linear-gradient(
			rgba(255, 255, 255, 0.3),
			rgba(255, 255, 255, 0.3)
		),
		url(/assets/images/background.jpg) center;
`;
const Wrapper = styled.div`
	display: flex;
	width: 70%;
	padding: 10px;
	flex-direction: column;
	background-color: white;
	align-items: center;
	border-radius: 20px;
	box-shadow: 0px 10px 15px black;
	${mobile({ width: "95%" })}
`;
const Form = styled.form`
	width: 70%;
	display: flex;
	flex-direction: column;
	${mobile({ width: "90%" })}
`;
const Logo = styled.h1`
	font-size: 50px;
	font-weight: 500;
	text-align: center;
	color: teal;
	margin: 20px;
	${mobile({ fontSize: "35px" })}
`;
const Heading = styled.h1`
	font-weight: 400;
	// color: purple;
	margin: 10px 0;
	${mobile({ fontSize: "25px" })}
`;

const Input = styled.input`
	flex: 1;
	font-size: 20px;
	margin: 10px 0;
	padding: 10px;
	border:none;
	border-bottom: 1px solid black;	
	outline:none;
	&:focus{
		font-weight:400;
	}
	
}
`;
const Submit = styled.button`
	flex: 1;
	font-size: 20px;
	padding: 10px;
	margin: 10px 0;
	background-color: teal;
	border: none;
	color: white;
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
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	// login process ===============>

	const loginHandler = async (e) => {
		e.preventDefault();
		dispatch(loginStart());
		const userDetails = { email, password };
		try {
			const user = await publicRequest.post("/auth/login", userDetails);
			dispatch(loginSuccess(user.data));
		} catch (err) {
			dispatch(loginError());
			console.log(err);
		}
	};

	return (
		<Container>
			<Wrapper>
				<Form onSubmit={loginHandler}>
					<Logo>CROWN</Logo>
					<Heading>SIGN IN</Heading>
					<Input
						type="email"
						placeholder="Enter Email"
						onBlur={(e) => {
							setEmail(e.target.value);
						}}
						required
					/>
					<Input
						type="password"
						placeholder="Enter password"
						onBlur={(e) => {
							setPassword(e.target.value);
						}}
						required
					/>
					<Submit>Login</Submit>

					<Desc>
						By continuing, you agree to{" "}
						<b>
							Crown-Store Company’s Terms of Use and Privacy
							Policy.
						</b>
					</Desc>
					<Options>
						<Register>Sign Up</Register>
						<ForgetPassword>Forget Password</ForgetPassword>
					</Options>
				</Form>
			</Wrapper>
		</Container>
	);
};
export default Login;
