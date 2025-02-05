import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { petDetails, postOrUpdatePet } from "../../Redux/Actions";
import { MdArrowBackIosNew } from "react-icons/md";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ErrorForm, SuccedForm } from "./AlertForm/AlertForm";
import "./FormPostPet.css";
import {
	Flex,
	Box,
	FormControl,
	Input,
	HStack,
	Stack,
	Button,
	Heading,
	Text,
	Icon,
	Select,
} from "@chakra-ui/react";

const validateForm = (input) => {
	let inputError = {};

	if (input.species === "" || !input.species.length) {
		inputError.species = "Selecciona gato o perro";
	}
	if (input.sex === "" || !input.sex.length) {
		inputError.sex = `Selecciona macho o hembra`;
	}
	if (input.age === "" || !input.age.length) {
		inputError.age = "Edad aproximada de la mascota";
	}
	if (input.size === "" || !input.size.length) {
		inputError.size = "Selecciona un tamaño aproximado";
	}
	if (input.status === "" || !input.status.length) {
		inputError.status = "Selecciona un estado";
	}
	if (input.area.trim() === "" || !input.area.length) {
		inputError.area = "Provee una localidad";
	}
	if (input.detail.trim()) {
		if (input.detail.trim().length < 15) {
			inputError.detail = "Inserta al menos 16 caractéres";
		}
	} else {
		inputError.detail = "Brinda una breve descripcion de la mascota";
	}
	if (input.img === "") {
		inputError.img = "Inserta el link de una imagen";
	}
	return inputError;
};

export default function FormPostPet({ value }) {
	const dispatch = useDispatch();
	const [isIncomplete, setIsIncomplete] = useState(false);
	const [infoSend, setInfoSend] = useState(false);
	const [inputError, setInputError] = useState({});
	const paramsId = useParams("id");
	let petData = useSelector((state) => state.Detail)

	const [input, setInput] = useState({
		species: "",
		sex: "",
		age: "",
		size: "",
		status: "",
		area: "",
		detail: "",
		img: "",
	});
function dataEmptied() {
	setInput({
		species: "",
		sex: "",
		age: "",
		size: "",
		status: "",
		area: "",
		detail: "",
		img: "",
	})
}
function completePetData(){
	setInput({
		species: petData?.species || "",
		sex: petData?.sex || "",
		age: petData?.age || "",
		size: petData?.size || "",
		status: petData?.status || "",
		area: petData?.area || "",
		detail: petData?.detail || "",
		img: petData?.img || "",
	})
}
	const handlerChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setInputError(
			validateForm({
				...input,
				[e.target.name]: e.target.value,
			})
		);
	};
	const handlerSubmit = (e) => {
		e.preventDefault();
		if (
			input.species &&
			input.sex &&
			input.age &&
			input.size &&
			input.area &&
			input.status &&
			input.detail &&
			input.img !== ""
		) {
			if(value === undefined) {
				dispatch(postOrUpdatePet(input, value))
				setIsIncomplete(false);
				setInfoSend(true);
				document.getElementById("myForm").reset();
			} else {
				dispatch(postOrUpdatePet(input, value, paramsId.id))
				setIsIncomplete(false);
				setInfoSend(true);
				document.getElementById("myForm").reset();			
			}
		} else {
			setIsIncomplete(true);
			setInfoSend(false);
		}
	};
	useEffect(() => {
		dispatch(petDetails(paramsId.id))
	}, [dispatch]);
	useEffect(()=>{
		if(value==="update"){
			completePetData()
		} else {
			dataEmptied()
		}
	},[petData, value])
	return (
		<div>
			<Navbar />

			{isIncomplete ? <ErrorForm /> : null}
			{infoSend ? <SuccedForm /> : null}

			<form onSubmit={(e) => handlerSubmit(e)} id="myForm">
				<Flex
					minH={"100vh"}
					align={"center"}
					justify={"center"}
					bg="brand.green.200">
					<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
						<Stack align={"center"}>
							{value === "update" ? (
								<Heading fontSize={"4xl"} textAlign={"center"}>
									Edita tu mascota
								</Heading>
							) : (
								<Heading fontSize={"4xl"} textAlign={"center"}>
									Registra tu mascota
								</Heading>
							)}
							<Text fontSize={"lg"} color={"gray.600"}>
								Gracias por cuidar a los animales ✌️
							</Text>
						</Stack>
						<Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
							<Stack spacing={4}>
								<HStack>
									<Box>
										<FormControl id="species" isRequired>
											<Select
												focusBorderColor={"brand.green.300"}
												fontFamily={"body"}
												name="species"
												value={input.species}
												onChange={(e) => handlerChange(e)}>
												<option
													value=""
													name="especie"
													key="defaultSpecies">
													Especie
												</option>
												<option value={"gato"} name="gato" key="cat">
													Gatx
												</option>
												<option value={"perro"} name="perro" key="dog">
													Perrx
												</option>
											</Select>
											{inputError.species && (
												<Text className="text_inputError">
													{inputError.species}
												</Text>
											)}
										</FormControl>
									</Box>

									<Box>
										<FormControl id="sex">
											<Select
												focusBorderColor={"brand.green.300"}
												value={input.sex}
												fontFamily={"body"}
												name="sex"
												key="sex"
												onChange={(e) => handlerChange(e)}>
												<option value="" key="defaultSex">
													Sexo
												</option>
												<option value="hembra" key="hembra">
													Hembra
												</option>
												<option value="macho" key="macho">
													Macho
												</option>
											</Select>
											{inputError.sex && (
												<Text className="text_inputError">
													{inputError.sex}
												</Text>
											)}
										</FormControl>
									</Box>
								</HStack>

								<FormControl id="age" isRequired>
									<Select
										focusBorderColor={"brand.green.300"}
										value={input.age}
										fontFamily={"body"}
										name="age"
										key="age"
										onChange={(e) => handlerChange(e)}>
										<option value="" key="defaultAge">
											Edad
										</option>
										<option value="cachorro" key="cachorro">
											Cachorro
										</option>
										<option value="joven" key="joven">
											Joven
										</option>
										<option value="adulto" key="adulto">
											Adulto
										</option>
									</Select>
									{inputError.age && (
										<Text className="text_inputError">{inputError.age}</Text>
									)}
								</FormControl>
								<FormControl id="size" isRequired>
									<Select
										focusBorderColor={"brand.green.300"}
										value={input.size}
										fontFamily={"body"}
										name="size"
										key="size"
										onChange={(e) => handlerChange(e)}>
										<option value="" key="defaultSize">
											Tamaño
										</option>
										<option value="pequeño" key="pequeño">
											Chico
										</option>
										<option value="mediano" key="mediano">
											Mediano
										</option>
										<option value="grande" key="grande">
											Grande
										</option>
									</Select>
									{inputError.size && (
										<Text className="text_inputError">{inputError.size}</Text>
									)}
								</FormControl>
								<FormControl id="status" isRequired>
									<Select
										focusBorderColor={"brand.green.300"}
										value={input.status}
										fontFamily={"body"}
										name="status"
										key="status"
										onChange={(e) => handlerChange(e)}>
										<option value="" key="defaultStatus">
											Estado
										</option>
										<option value="encontrado" key="encontrado">
											Encontrado
										</option>
										<option value="perdido" key="perdido">
											Perdido
										</option>
									</Select>
									{inputError.status && (
										<Text className="text_inputError">{inputError.status}</Text>
									)}
								</FormControl>

								<FormControl>
									<Text fontFamily={"body"} fontSize="14px">
										Área:
									</Text>
									<Input
										value={input.area}
										type="text"
										fontFamily={"body"}
										name="area"
										variant="flushed"
										focusBorderColor={"brand.green.300"}
										placeholder="Lugar donde se encuentra.."
										onChange={(e) => handlerChange(e)}
									/>
									{inputError.area && (
										<Text className="text_inputError">{inputError.area}</Text>
									)}
								</FormControl>

								<FormControl>
									<Text fontFamily={"body"} fontSize="14px">
										Detalles:
									</Text>
									<Input
										value={input.detail}
										fontFamily={"body"}
										variant="flushed"
										focusBorderColor={"brand.green.300"}
										placeholder="Descripción de la mascota.."
										size="md"
										name="detail"
										onChange={(e) => handlerChange(e)}
									/>
									{inputError.detail && (
										<Text className="text_inputError">{inputError.detail}</Text>
									)}
								</FormControl>

								<FormControl>
									<Text fontFamily={"body"} fontSize="14px">
										Imagen:
									</Text>
									<Input
										value={input.img}
										type="text"
										fontFamily={"body"}
										name="img"
										variant="flushed"
										focusBorderColor={"brand.green.300"}
										placeholder="https://urlDeLaImagen.jpg"
										onChange={(e) => handlerChange(e)}
									/>
									{inputError.img && (
										<Text className="text_inputError">{inputError.img}</Text>
									)}
								</FormControl>
								<Stack spacing={10} pt={2}>
									{value === undefined ? (
										<Button
											onClick={(e) => [handlerSubmit(e), window.scrollTo(0, 0)]}
											loadingText="Post mascota"
											fontFamily={"body"}
											size="lg"
											bg={"orange.300"}
											color={"white"}
											_hover={{
												bg: "orange.400",
												/* color:"brand.green.100" */
											}}>
											Post mascota
										</Button>
									) : (
										<Button
											onClick={(e) => [handlerSubmit(e), window.scrollTo(0, 0)]}
											loadingText="Post mascota"
											fontFamily={"body"}
											size="lg"
											bg={"orange.300"}
											color={"white"}
											_hover={{
												bg: "orange.400",
												/* color:"brand.green.100" */
											}}>
											Modificar mascota
										</Button>
									)}
								</Stack>
							</Stack>
						</Box>

						<Link to={"/home"}>
							<Icon
								as={MdArrowBackIosNew}
								color="orange.400"
								boxSize={5}
								_hover={{
									color: "grey",
									boxSize: "7",
								}}
							/>
							<Icon
								as={MdArrowBackIosNew}
								color="orange.400"
								boxSize={5}
								_hover={{
									color: "grey",
									boxSize: "7",
								}}
							/>
							<Button
								fontFamily={"body"}
								bg="base.green.100"
								color={"grey"}
								_hover={{
									color: "orange.400",
								}}
								p="0"
								mr="1rem">
								{" "}
								Atrás
							</Button>
						</Link>
					</Stack>
				</Flex>
			</form>

			<Footer />
		</div>
	);
}
