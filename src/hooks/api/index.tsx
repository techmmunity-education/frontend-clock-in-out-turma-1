import axios from "axios";
import { urls } from "config/url";
import { RegisterInput, RegisterOutput } from "./types/company/register";
import { LoginInput, LoginOutput } from "./types/company/login";

const { url, version } = urls.backend;

export const useApi = () => {
	const instance = axios.create({ baseURL: `${url}/${version}` });

	const register = (params: RegisterInput) =>
		instance
			.post<RegisterOutput>("/company/register", params)
			.then(result => result.data);

	const login = (params: LoginInput) =>
		instance
			.post<LoginOutput>("/employee/login", params)
			.then(result => result.data);

	return {
		register,
		login,
	};
};
