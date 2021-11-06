import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "styles/global.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { DefaultLayout } from "layouts/default";
import { ToastContainer } from "react-toastify";
import { RequireLogin } from "wrapper/require-login";
import { AlreadyLogged } from "wrapper/already-logged";
import { AuthProvider } from "context/auth";

const lazyLoading = (path: string) =>
	lazy(() => import(`./pages/${path}/index.tsx`));

const createComponentRequireLogin = (path: string) => () => {
	const Component = lazyLoading(path);

	return (
		<RequireLogin>
			<DefaultLayout>
				<Component />
			</DefaultLayout>
		</RequireLogin>
	);
};

const createComponentAlreadyLogged = (path: string) => () => {
	const Component = lazyLoading(path);

	return (
		<AlreadyLogged>
			<DefaultLayout>
				<Component />
			</DefaultLayout>
		</AlreadyLogged>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<ToastContainer />
			<BrowserRouter>
				<Switch>
					<Suspense fallback={<div></div>}>
						<Route
							path="/company/register"
							exact
							component={createComponentAlreadyLogged("register")}
						/>
						<Route
							path="/"
							exact
							component={createComponentRequireLogin("home")}
						/>
					</Suspense>
				</Switch>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);
