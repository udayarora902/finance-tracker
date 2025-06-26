export const cookieUtils = {
  setCookie: (name, value, days = 60) => {
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${JSON.stringify(
        value
      )};expires=${expires.toUTCString()};path=/`;
    } catch (error) {
      console.warn("Failed to set cookie:", error);
    }
  },

  getCookie: (name) => {
    try {
      const nameEQ = name + "=";
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          try {
            return JSON.parse(c.substring(nameEQ.length, c.length));
          } catch (e) {
            return null;
          }
        }
      }
      return null;
    } catch (error) {
      console.warn("Failed to get cookie:", error);
      return null;
    }
  },

  deleteCookie: (name) => {
    try {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    } catch (error) {
      console.warn("Failed to delete cookie:", error);
    }
  },
};
