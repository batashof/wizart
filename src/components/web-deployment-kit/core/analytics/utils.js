const WIZART_ANALYTICS_KEY = 'wizart_u_key';

export const uuid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const getLang = () => {
  let lang = '';
  if (window.navigator) {
    lang = window.navigator.language;
  }

  return lang;
};

export const getUserId = () => {
  let id = window.localStorage.getItem(WIZART_ANALYTICS_KEY);
  if (!id) {
    id = uuid();
    window.localStorage.setItem(WIZART_ANALYTICS_KEY, id);
  }

  return id;
};
