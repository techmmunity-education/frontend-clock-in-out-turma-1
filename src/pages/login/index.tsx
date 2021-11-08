import { Form, Input, Button, Checkbox, Col } from "antd";
import { useAuthContext } from "context/auth";
import { useApi } from "hooks/api";
import { useLoading } from "hooks/loading";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, FormContainer } from "./styles";

const Login = () => {
	const history = useHistory();
	const { login } = useApi();
	const { requestState, setErrorState, setLoadingState, setSuccessState } =
		useLoading();
	const authContext = useAuthContext();

	const onFinish = useCallback(async (values: any) => {
		try {
			setLoadingState();

			const { authCode } = await login(values);

			if (values.remember) {
				localStorage.setItem("userToken", authCode);
			}

			authContext.setToken(authCode);

			setSuccessState();
			history.push("/");

			toast.success("Logado com sucesso");
		} catch (err: any) {
			setErrorState();

			toast.error("Falha ao logar");

			console.error(err);
		}
	}, []);

	const onFinishFailed = useCallback((error: any) => {
		setErrorState();

		toast.error("Falha ao logar");

		console.error(error);
	}, []);

	return (
		<Container>
			<FormContainer>
				{requestState === "ERROR" && <p>CNPJ, CPF ou senha incorretos</p>}
				<Form
					name="login"
					labelCol={{ span: 12 }}
					wrapperCol={{ span: 12 }}
					initialValues={{ remember: false }}
					style={{ paddingRight: "3rem" }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						label="CNPJ"
						name="cnpj"
						rules={[{ required: true, message: "CNPJ é um campo obrigatório" }]}
					>
						<Input placeholder="Digite seu CNPJ" type="text" />
					</Form.Item>

					<Form.Item
						label="CPF"
						name="cpf"
						rules={[{ required: true, message: "CPF é um campo obrigatório" }]}
					>
						<Input placeholder="Digite seu CPF" type="text" />
					</Form.Item>

					<Form.Item
						label="Senha"
						name="password"
						rules={[
							{ required: true, message: "Senha é um campo obrigatório" },
						]}
					>
						<Input placeholder="Digite sua senha" type="password" />
					</Form.Item>

					<Form.Item
						name="remember"
						valuePropName="checked"
						wrapperCol={{ offset: 8 }}
					>
						<Checkbox> Lembrar de mim </Checkbox>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8 }}>
						<Button
							type="primary"
							htmlType="submit"
							style={{ borderRadius: "5px" }}
							disabled={requestState === "LOADING"}
						>
							Entrar
						</Button>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8 }} style={{ marginBottom: 0 }}>
						<span>Não possui cadastro?</span>
						<Col offset={2}>
							<Link to="/company/register">Clique aqui!</Link>
						</Col>
					</Form.Item>
				</Form>
			</FormContainer>
		</Container>
	);
};

export default Login;
