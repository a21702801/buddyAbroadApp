export interface IGetTopVisitsRequest {
    country: string;
    quantity: number;
}

export class GetTopVisitsRequest implements IGetTopVisitsRequest {
    constructor(
        public country: string,
        public quantity: number,
    ) {}
}
