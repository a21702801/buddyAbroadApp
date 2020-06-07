export interface IVisitCard {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    duration: string;
    minGroupSize: number;
    maxGroupSize: number;
    pricePerson: string;
    rating: number;
    img: string;
}

export class VisitCard implements IVisitCard {
    constructor(
        public id: number,
        public title: string,
        public firstName: string,
        public lastName: string,
        public duration: string,
        public minGroupSize: number,
        public maxGroupSize: number,
        public pricePerson: string,
        public rating: number,
        public img: string,
    ) {}
}
