export class VendorDataModel {

    constructor(public accountNo: string,
        public address: string,
        public cityId: number,
        public countryId: number,
        public email: string,
        public firstName: string,
        public lastName: string,
        public id: number,
        public mobileNo: string,
        public photo: string,
        public stateId: number,
        public status: number,
        public street: string,
        public zip: string,
        public vendorRegistrationNo: string) {

    }
}

export class AddEditVendorDataModel {
    public address: string;
    public cityId: number;
    public countryId: number;
    public email: string;
    public firstName: string;
    public lastName: string;
    public id: number;
    public mobileNo: string;
    public stateId: number;
    public status: number;
    public street: string;
    public zip: string;
    public vendorRegistrationNo: string;

    constructor(

    ) {

    }
}
