export interface RegisterInput {
	cnpj: string;
	cpf: string;
	name: string;
	password: string;
}

export interface RegisterOutput {
	authCode: string;
}
