import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    constructor() { }
     // public API_BASE_URL = 'http://localhost:8084/taxi/';
    public API_BASE_URL = 'http://18.191.143.194:8080/taxi/';
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
    public API_CAB_POP_UP_Data = 'cab/popUPData';

    public API_DS_UPDATE = 'ds/update';
    public API_DS_ADD = 'ds/add';
    public API_DS_DELETE = 'ds/delete';
    public API_DS_LIST = 'ds/list';
    public API_DS_VIEW = 'ds/view';
    public API_DS_DETAILS = 'ds/details';

    public API_USER_UPDATE = 'user/update';
    public API_USER_ADD = 'user/add';
    public API_USER_DELETE = 'user/delete';
    public API_USER_LIST = 'user/list';
    public API_USER_VIEW = 'user/view';
    public API_USER_DETAILS = 'user/details';

    public API_VENDOR_UPDATE = 'vendor/update';
    public API_VENDOR_ADD = 'vendor/add';
    public API_VENDOR_DELETE = 'vendor/delete';
    public API_VENDOR_LIST = 'vendor/list';
    public API_VENDOR_VIEW = 'vendor/view';
    public API_VENDOR_DETAILS = 'vendor/details';
    public API_USER_RIDER_LIST = 'user/riderList';
    public API_USER_VENDOR_LIST = 'user/vendorList';
    public API_TRIP_ON_GOING_LIST = 'trips/tripsongoing';
    public API_TRIP_BOOK = 'trips/add';
    public API_TRIP_MAP_POLYDATA = 'trips//polymapdata';
    public API_TRIP_STATISTICS = 'statistics/staticstics';


}
