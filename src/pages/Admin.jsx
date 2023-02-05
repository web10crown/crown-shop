import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useState } from "react";
const Container = styled.div``;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;
const Products = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;
const Heading = styled.h1`
	color: teal;
	font-weight: 600;
	margin-bottom: 20px;
`;
const AddProducts = styled.form`
	display: flex;
	flex-direction: column;
	width: 70%;
	font-weight: 500;
`;
const Input = styled.input`
	margin: 5px 0;
	font-weight: 500;
`;

const Button = styled.button`
	color: white;
	background-color: teal;
	border: none;
	font-weight: 400;
	padding: 5px;
	margin: 10px 0;
`;

const Admin = () => {
	const [brand, setBrand] = useState("");
	const [name, setName] = useState("");
	const [colour, setColour] = useState([]);
	const [category, setCategory] = useState([]);
	const [price, setPrice] = useState(1);
	const [size, setSize] = useState([]);
	const [image, setImage] = useState({});
	const [desc, setDesc] = useState("");
	const [token, setToken] = useState("");
	const [buttonBool, setButtonBool] = useState(false);
	const user = useSelector((state) => state.user);

	// fire base code here =============>
	const storage = getStorage(app);
	// colour handler ==================>
	const colourHandler = (e) => {
		const colours = e.target.value.split(" ");
		setColour(colours);
	};

	// category ========================>
	const categoryHandler = (e) => {
		const categories = e.target.value.split(" ");
		setCategory(categories);
	};

	// size ============================>
	const sizeHandler = (e) => {
		const sizeArray = [...size];
		const res = sizeArray.find((element) => element === e.target.value);
		if (res) {
			console.log("res ", res);
		} else {
			sizeArray.push(e.target.value);
			setSize(sizeArray);
		}
	};

	// upload product start here ===========>
	const uploadData = async (p) => {
		try {
			await publicRequest.post("/products/create", p, {
				headers: { token: `Bearer ${token}` },
			});
			toast.success("Product uploaded successfully");
			setButtonBool(false);
		} catch (err) {
			toast.error("something went wrong");
			setButtonBool(false);
		}
	};

	// submit ==========================>
	const submitHandler = (e) => {
		e.preventDefault();
		setButtonBool(true);
		user.user ? setToken(user.user.token) : setToken("");
		const fileName = new Date().getTime() + image.name;
		const storageRef = ref(storage, fileName);

		const uploadTask = uploadBytesResumable(storageRef, image);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
					default:
				}
			},
			(error) => {
				// Handle unsuccessful uploads
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					const newProduct = {
						brand,
						name,
						desc,
						image: downloadURL,
						category,
						size,
						colour,
						price,
					};
					uploadData(newProduct);
				});
			}
		);
	};
	return (
		<Container>
			<Wrapper>
				<Products>
					<AddProducts onSubmit={submitHandler}>
						<Heading>Add Products</Heading>
						<Input
							placeholder="Enter Brand"
							onBlur={(e) => {
								setBrand(e.target.value);
							}}
						/>
						<Input
							placeholder="Enter Name"
							onBlur={(e) => {
								setName(e.target.value);
							}}
						/>
						<span style={{ color: "teal" }}>
							{colour.map((c) => c + ", ")}
						</span>
						<Input
							placeholder="Enter colour give space after each colour"
							onChange={colourHandler}
						/>
						<span style={{ color: "teal" }}>
							{category.map((c) => c + ", ")}
						</span>
						<Input
							placeholder="Enter category like Men shirt give space after each category"
							onChange={categoryHandler}
						/>
						<Input
							type="number"
							min="1"
							placeholder="Enter Price in $"
							required
							onBlur={(e) => {
								setPrice(e.target.value);
							}}
						/>
						<span style={{ color: "teal" }}>
							{size.map((s) => s + ", ")}
						</span>
						<select onChange={sizeHandler}>
							<option disabled={true}>Size</option>
							<option>S</option>
							<option>M</option>
							<option>L</option>
							<option>XL</option>
							<option>XXL</option>
						</select>
						<Input
							type="file"
							required
							onChange={(e) => {
								setImage(e.target.files[0]);
							}}
						/>
						<textarea
							name=""
							placeholder="enter description"
							id=""
							cols=""
							rows="5"
							required
							onBlur={(e) => {
								setDesc(e.target.value);
							}}
						></textarea>
						<Button disabled={buttonBool}>Submit</Button>
					</AddProducts>
				</Products>
			</Wrapper>
		</Container>
	);
};
export default Admin;
