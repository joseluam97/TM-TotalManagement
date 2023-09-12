//Obtener cookie
export function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
}

export const deleteCookies = async () => {
  const cDecoded = decodeURIComponent(document.cookie); //to be carefulconst clearCookies = document.cookie
  const cArr = cDecoded.split('; ');
  cArr.forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`));
};