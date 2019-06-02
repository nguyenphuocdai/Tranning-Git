export class DataDTO {
    token: string;
    uuid: number;
}

export class ResponseDTO {
	RequestID: number;
	FunctionName: string;
	Description: string;
	Data: DataDTO;
	ResponseDateTime: string;
}
