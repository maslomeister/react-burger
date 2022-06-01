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
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie + "path=/";
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

export function declOfNum(n: number, text_forms: string[]) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 === 1) {
    return text_forms[0];
  }
  return text_forms[2];
}

export const formatDisplayDate = (date: string): string => {
  const orderDate = new Date(date).setHours(0, 0, 0, 0);
  const currentDate = new Date().setHours(0, 0, 0, 0);

  const daysSinceDate = Math.floor(
    Math.abs(currentDate - orderDate) / 86400000
  );

  let day = new Date(orderDate).toLocaleDateString("ru-RU", {});
  if (daysSinceDate < 1) {
    day = "Сегодня";
  } else if (daysSinceDate === 1) {
    day = "Вчера";
  } else {
    day = `${daysSinceDate} ${declOfNum(daysSinceDate, [
      "день",
      "дня",
      "дней",
    ])} назад, `;
  }
  const time = new Date(date).toLocaleTimeString("ru-Ru", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
  return `${day}, ${time}`;
};
