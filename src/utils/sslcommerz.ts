import config from "../config";

const SSLCommerzPayment = require('sslcommerz-lts')

const store_id = config.sslc_STORE_ID || "000";
const store_passwd = config.sslc_STORE_PASS || "000";
const is_live = false; // true for live, false for sandbox

export const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

