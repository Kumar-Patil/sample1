export class DeliveryModel {
    constructor(public bookingAt: any,
        public deliveryCurrentStatus: string,
        public status: string,
        public orderType: string,
        public type: string,
        public deliveryId: number,
        public weight: number,
        public noOfUnits: number,
        public contactPersonName: string,
        public reciptentName: string) { }
// tslint:disable-next-line:eofline
}