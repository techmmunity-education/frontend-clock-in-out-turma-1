import { ClockInOutTypeEnum } from "enums/clock-in-out-type";
import { RoleTypeEnum } from "enums/role-types";

export interface CreateClockInOutInput {
	cpf: string;
	cnpj: string;
	type: ClockInOutTypeEnum;
	role: RoleTypeEnum;
	createdAt?: Date;
	isJustified?: boolean;
	reason?: string;
}
