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
export const docMatch = /\.(jpg|jpeg|png|gif|pdf|JPG|JPEG|PNG|GIF|PDF)$/;
export const lat = parseFloat(process.env.REACT_APP_LAT)
export const lng = parseFloat(process.env.REACT_APP_LNG);
//export const currenDate = Date().toLocaleString();
//export const todayDate = new Date().toISOString().slice(0, 10)
export const currenDate = new Date(Date.now() + 2 * (60 * 60 * 1000));
export const todayDate = currenDate.toISOString().slice(0, 10)

//var chkPass=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
var chkPass = /[A-Za-z\d]{8,}$/
export const validPass = (val) => val && chkPass.test(val)
//https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
//export const passErr="Minimum eight characters, at least one letter and one number"//chkpass
export const passErr = "Minimum eight characters."//chkpass
var chkUsrName = /^[A-Za-z][a-zA-Z\d_.]{7,10}$/
export const validUsrName = (val) => val && chkUsrName.test(val)
export const usrNameErr = "Username length between 7 & 10 and should start with an alphabet, can contain alphabets, numbers, an underscore or period"


export const descMax = 150
export const subtractMonths = (numOfMonths, todayDate = new Date()) => {
  let d = new Date(todayDate);
  let newDate = d.setMonth(d.getMonth() - numOfMonths)

  return new Date(newDate).toISOString().slice(0, 10);
}

export const subtractDays = (numOfDays, todayDate = new Date()) => {
    let d = new Date(todayDate);
    let newDate = d.setDate(d.getDate() - numOfDays)
  
    return new Date(newDate).toISOString().slice(0, 10);
  }
