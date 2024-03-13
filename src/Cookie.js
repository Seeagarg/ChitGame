import Cookies from "js-cookie"

export function setCookie(cookie){
    Cookies.set('token',cookie,{expires:2})
}

export  function getCookie(){
    const token = Cookies.get('token');
    // console.log(token,"token....")
    return token;
}

export function removeCookie(){
    Cookies.remove('token')
}