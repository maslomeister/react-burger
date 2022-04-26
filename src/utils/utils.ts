export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props?: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function userAuthorized(user: { name: string; email: string }) {
  if (user.email === "" && user.name === "") {
    return false;
  } else {
    return true;
  }
}

export function checkAccessToken() {
  return getCookie("refreshToken");
}

export function validateInputField(input: string, name: string) {
  if (input.length === 0 || input === undefined) {
    return { isValid: false, error: `Поле не может быть пустым` };
  }
  switch (name) {
    case "name": {
      const regex = new RegExp("^[-a-zA-Zа-яА-Я0-9]+$");
      if (input.length <= 4) {
        return { isValid: false, error: "Минимальная длина имени - 4 символа" };
      }
      if (!regex.exec(input)) {
        return {
          isValid: false,
          error: "Имя не может содержать символы или пробелы",
        };
      }

      return { isValid: true, error: "" };
    }
    case "password": {
      const regex = new RegExp("  *");
      if (regex.exec(input)) {
        return { isValid: false, error: "Пароль не может содержать пробелы" };
      }
      if (input.length <= 8) {
        return {
          isValid: false,
          error: "Минимальная длина пароля - 8 символов",
        };
      }
    }
  }
  return { isValid: true, error: "" };
}

export function validateName(input: string) {
  const regex = new RegExp("^[-a-zA-Zа-яА-Я0-9]+$");
  if (input.length <= 4) {
    return { isValid: false, error: "Минимальная длина имени - 4 символа" };
  }
  if (!regex.exec(input)) {
    return {
      isValid: false,
      error: "Имя не может содержать символы или пробелы",
    };
  }

  return { isValid: true, error: "" };
}

export function validateEmail(input: string) {
  return { isValid: true, error: "" };
}

export function validatePassword(input: string) {
  if (input.length === 0) {
    return { isValid: false, error: "Пароль не может быть пустым" };
  }
  if (input.length <= 8) {
    return { isValid: false, error: "Минимальная длина пароля - 8 символов" };
  }
  return { isValid: true, error: "" };
}
