import { Container, Content } from "./styles";

export const DefaultLayout: FC<{ children: Array<JSX.Element> | JSX.Element }> =
	({ children }) => {
		return (
			<Container>
				<Content>{children}</Content>
			</Container>
		);
	};
