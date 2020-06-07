export interface IVisitHomeCard {
    title?: string;
    buddy?: string;
    price?: string;
    duration?: string;
    groupSize?: string;
}

export class VisitHomeCard implements IVisitHomeCard {
    constructor(
        public title?: string,
        public buddy?: string,
        public price?: string,
        public duration?: string,
        public groupSize?: string,
    ) {}
}
