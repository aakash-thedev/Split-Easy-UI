import Cookies from "js-cookie";

export const JWT_TOKEN = "jwtToken";

function setCookie(key: string, value: string) {
  Cookies.set(key, value, { expires: 2 });
}

function getCookie(key: string) {
  return Cookies.get(key);
}

function removeCookie(key: string) {
  Cookies.remove(key);
}

export { setCookie, getCookie, removeCookie };
