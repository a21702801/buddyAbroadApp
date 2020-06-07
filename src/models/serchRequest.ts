export interface ISearchRequest {
    id: number;
    country: string;
    priceRangeLower: number;
    priceRangeUpper: number;
    ratingRangeLower: number;
    ratingRangeUpper: number;
    maxDuration: string;
    groupSizeLower: number;
    groupSizeUpper: number;
    distance: number;
    latitude: number;
    longitude: number;
    unit: string;
}

export class SearchRequest implements ISearchRequest {
    constructor(
        public id: number,
        public country: string,
        public priceRangeLower: number,
        public priceRangeUpper: number,
        public ratingRangeLower: number,
        public ratingRangeUpper: number,
        public maxDuration: string,
        public groupSizeLower: number,
        public groupSizeUpper: number,
        public distance: number,
        public latitude: number,
        public longitude: number,
        public unit: string,
    ) {}
}
