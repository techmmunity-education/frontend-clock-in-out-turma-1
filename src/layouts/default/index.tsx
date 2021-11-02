import { Container } from "./styles";

export const DefaultLayout: FC<{ children: Array<JSX.Element> | JSX.Element }> =
	({ children }) => {
		return <Container>{children}</Container>;
	};
