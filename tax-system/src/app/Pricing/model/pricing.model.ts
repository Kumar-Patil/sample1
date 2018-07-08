export class PricingModel {
    constructor(public pricingGroupName: string,
        public pricePerUnitDistance: number,
        public status: string,
        public pricePerMinute: number,
        public vendorName: string,
        public pricingId: number,
        public vendorRegistrationNo: string) { }
// tslint:disable-next-line:eofline
}