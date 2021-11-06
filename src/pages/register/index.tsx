import { Form, Button, Checkbox, Input, Col } from "antd";
import { RuleRender } from "antd/lib/form";
import { useAuthContext } from "context/auth";
import { useApi } from "hooks/api";
import { useLoading } from "hooks/loading";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, FormContainer } from "./styles";

const Register = () => {
	const history = useHistory();
	const { register } = useApi();
	const { requestState, setErrorState, setLoadingState, setSuccessState } =
		useLoading();
	const { setToken } = useAuthContext();

	const validateConfirmPassword: RuleRender = useCallback(
		({ getFieldValue }) => ({
			validator: (_, value) => {
				if (!value || getFieldValue("password") === value) {
					return Promise.resolve();
				}

				return Promise.reject("Senha não corresponde");
			},
		}),
		[],
	);

	const onFinish = useCallback(async (values: any) => {
		try {
			setLoadingState();

			const { authCode } = await register(values);

			setSuccessState();

			if (values.remember) {
				localStorage.setItem("userToken", authCode);
			}

			setToken(authCode);
			history.push("/");

			toast.success("Registrado com sucesso");
		} catch (err: any) {
			setErrorState();

			toast.error("Falha ao se registrar");
			// eslint-disable-next-line no-console
			console.log(err);
		}
	}, []);

	const onFinishFailed = useCallback((error: any) => {
		setErrorState();

		toast.error("Falha ao se registrar");
		// eslint-disable-next-line no-console
		console.log(error);
	}, []);

	return (
		<Container>
			<FormContainer>
				<Form
					name="register"
					labelCol={{ span: 12 }}
					wrapperCol={{ span: 12 }}
					initialValues={{ remember: false }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						label="CNPJ"
						name="cnpj"
						rules={[{ required: true, message: "CNPJ é um campo obrigatório" }]}
					>
						<Input placeholder="Digite o CNPJ da empresa" />
					</Form.Item>

					<Form.Item
						label="Razão Social"
						name="name"
						rules={[
							{
								required: true,
								message: "Razão social é um campo obrigatório",
							},
						]}
					>
						<Input placeholder="Digite a Razão Social da empresa" />
					</Form.Item>

					<Form.Item
						label="CPF"
						name="cpf"
						rules={[{ required: true, message: "CPF é um campo obrigatório" }]}
					>
						<Input placeholder="Digite seu CPF" />
					</Form.Item>

					<Form.Item
						label="Senha"
						name="password"
						rules={[
							{ required: true, message: "Senha é um campo obrigatório" },
						]}
					>
						<Input.Password placeholder="Digite sua senha" />
					</Form.Item>

					<Form.Item
						label="Confirmar senha"
						name="confirmPassword"
						rules={[
							{ required: true, message: "Confirme sua senha" },
							validateConfirmPassword,
						]}
						dependencies={["password"]}
					>
						<Input.Password placeholder="Confirme sua senha" />
					</Form.Item>

					<Form.Item
						name="remember"
						valuePropName="checked"
						wrapperCol={{ offset: 6 }}
					>
						<Checkbox>Lembre-se de mim</Checkbox>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8 }}>
						<Button
							type="primary"
							htmlType="submit"
							disabled={requestState === "LOADING"}
						>
							Registrar-se
						</Button>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8 }} style={{ marginBottom: 0 }}>
						<span>Já possui cadastro?</span>
						<Col offset={2}>
							<Link to="/">Clique aqui!</Link>
						</Col>
					</Form.Item>
				</Form>
			</FormContainer>
		</Container>
	);
};

export default Register;
