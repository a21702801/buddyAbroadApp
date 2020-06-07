export interface IGetVisitsNearby {
    lat: number;
    lon: number;
    units: string;
    distance: number;
}

export class GetVisitsNearby implements IGetVisitsNearby {
    constructor(
        public lat: number,
        public lon: number,
        public units: string,
        public distance: number,
    ) {}
}
