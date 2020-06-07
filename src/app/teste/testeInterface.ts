export interface IAccessToken {
    accessToken: string;
}

export class AccessToken implements IAccessToken {
    constructor(public accessToken: string) {}
}
