export interface LoginInput {
	cnpj: string;
	cpf: string;
	password: string;
}

export interface LoginOutput {
	authCode: string;
}
