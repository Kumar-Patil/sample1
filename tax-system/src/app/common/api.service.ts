import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    constructor() { }
    public API_BASE_URL = 'http://localhost:8084/taxi/';
    public API_LOGIN_URL = 'login/user';
    public API_DRIVER_LIST = 'driver/list';
    public API_DRIVER_DETAILS = 'driver/details';
    public API_DRIVER_ADD = 'driver/add';
    public API_DRIVER_UPDATE = 'driver/update';
    public API_DRIVER_DELETE = 'driver/delete';
    public API_DRIVER_VIEW = 'driver/view';

    public API_COMMON_STATE_LIST = 'common/stateList';
    public API_COMMON_CAB_LIST = 'common/cabsList';
    public API_COMMON_CITY_LIST = 'common/cityList';
    public API_COMMON_COUNTRY_LIST = 'common/countryList';
    public API_COMMON_ALL_POP_DATA = 'common/popData';

    public API_COMMON_FILE_HANDLER = 'common/fileHandler';
    public API_COMMON_FILE_UPLOAD = 'common/uploadFile';
    public API_COMMON_STATUS_LIST = 'common/statusList';
    public API_PRICE_UPDATE = 'price/update';
    public API_PRICE_ADD = 'price/add';
    public API_PRICE_DELETE = 'price/delete';
    public API_PRICE_LIST = 'price/list';
    public API_PRICE_VIEW = 'price/view';
    public API_PRICE_DETAILS = 'price/details';
    public API_PRICE_STATUS_VENDOR_LIST = 'price/statusAndVendorList';

    public API_SURGE_UPDATE = 'surge/update';
    public API_SURGE_ADD = 'surge/add';
    public API_SURGE_DELETE = 'surge/delete';
    public API_SURGE_LIST = 'surge/list';
    public API_SURGE_VIEW = 'surge/view';
    public API_SURGE_DETAILS = 'surge/details';

    public API_CAB_UPDATE = 'cab/update';
    public API_CAB_ADD = 'cab/add';
    public API_CAB_DELETE = 'cab/delete';
    public API_CAB_LIST = 'cab/list';
    public API_CAB_VIEW = 'cab/view';
    public API_CAB_DETAILS = 'cab/details';
    public API_CAB_POP_UP_Data = 'cab/popData';


}
