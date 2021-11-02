import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "styles/global.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { DefaultLayout } from "layouts/default";

const lazyLoading = (path: string) =>
	lazy(() => import(`./pages/${path}/index.tsx`));

const createComponent = (path: string) => () => {
	const Component = lazyLoading(path);

	return (
		<DefaultLayout>
			<Component />
		</DefaultLayout>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Switch>
				<Suspense fallback={<div></div>}>
					<Route path="/" exact component={createComponent("home")} />
				</Suspense>
			</Switch>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root"),
);
