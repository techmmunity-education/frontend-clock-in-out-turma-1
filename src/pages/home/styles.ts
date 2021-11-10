import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
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
	flex-wrap: wrap;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	max-width: 30rem;
	max-height: 30rem;

	> Form > *:last-child {
		margin-bottom: 0;
	}
`;
