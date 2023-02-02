
export const required = (val) => val && val.length;
//export const required = (val) => val != "" || val != null;
export const maxLength = (len) => (val) => !val || val.length <= len;
export const minLength = (len) => (val) => val && val.length >= len;
export const isNumber = (val) => !isNaN(Number(val));
var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const isEmail = (val) => val === null || val.trim() === '' || filter.test(val);
export const requiredErr = "This is a mandatory field";
export const numErr = "You have to enter number";
export const emailErr = "Please enter a valid E-Mail ID";
export const imgMatch = /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/;