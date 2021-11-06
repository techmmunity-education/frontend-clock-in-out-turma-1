import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background: rgb(89, 89, 89);
	background: radial-gradient(
		circle,
		rgba(89, 89, 89, 1) 0%,
		rgba(52, 52, 59, 1) 35%,
		rgba(0, 0, 0, 1) 100%
	);
`;

export const FormContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	max-height: 48rem;
	min-height: 48rem;
	height: 100%;
	max-width: 40rem;
	min-width: 40rem;
	width: 100%;
	background-color: white;

	> Form {
		max-width: 40rem;
		max-height: 45rem;
		box-sizing: content-box;
	}
`;
