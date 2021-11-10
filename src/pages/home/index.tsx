import { Button, Form, Select } from "antd";
import { ClockInOutTypeEnum } from "enums/clock-in-out-type";
import { useApi } from "hooks/api";
import { useLoading } from "hooks/loading";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { Container, FormContainer } from "./styles";

const ONE_SEC = 1000;
const GET_HOUR_MIN_SEC =
	/(([0-9])([0-9])([:])([0-9])([0-9])([:])([0-9])([0-9]))/gm;

const { Option } = Select;

const Home = () => {
	const { createClockInOut } = useApi();
	const { requestState, setErrorState, setSuccessState, setLoadingState } =
		useLoading();

	const [time, setTime] = useState<Date>(new Date());

	useEffect(() => {
		const interval = setInterval(() => setTime(new Date()), ONE_SEC);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const onFinish = useCallback(
		async (values: any) => {
			// eslint-disable-next-line no-console
			try {
				setLoadingState();

				await createClockInOut(values);
				setSuccessState();

				toast.success("Ponto marcado com sucesso");
			} catch (err: any) {
				setErrorState();
				toast.error("Falha ao marcar ponto");
				// eslint-disable-next-line no-console
				console.log(err);
			}
		},
		[createClockInOut, setErrorState, setLoadingState, setSuccessState],
	);

	const onFinishFailed = useCallback(
		(error: any) => {
			setErrorState();

			toast.error("Falha ao marcar ponto");
			// eslint-disable-next-line no-console
			console.log(error);
		},
		[setErrorState],
	);

	return (
		<Container>
			<FormContainer>
				<Clock value={time} />
				<p>{time.toString().match(GET_HOUR_MIN_SEC)}</p>
				<Form name="create" onFinish={onFinish} onFinishFailed={onFinishFailed}>
					<Form.Item name="type">
						<Select>
							<Option value={ClockInOutTypeEnum.CLOCK_IN}>Entrada</Option>
							<Option value={ClockInOutTypeEnum.PAUSE_OUT}>Pausa</Option>
							<Option value={ClockInOutTypeEnum.PAUSE_IN}>Retorno</Option>
							<Option value={ClockInOutTypeEnum.CLOCK_OUT}>Saída</Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<Button
							htmlType="submit"
							type="primary"
							disabled={requestState === "LOADING"}
						>
							Marcar
						</Button>
					</Form.Item>
				</Form>
			</FormContainer>
		</Container>
	);
};

export default Home;
