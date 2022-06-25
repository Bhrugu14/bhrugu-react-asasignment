export const StoreValue = (keyName, value) => {
  let stringValue = typeof value != "string" ? JSON.stringify(value) : value;
  window.localStorage.setItem(keyName, stringValue);
  return { status: true, value: value };
};
export const RemoveValue = (keyName) => {
  if (keyName) {
    window.localStorage.removeItem(keyName);
    return { status: true, value: `${keyName} removed` };
  } else {
    window.localStorage.clear();
    return { status: true, value: "cleared" };
  }
};
export const GetValue = (keyName) => {
  let storedValue = window.localStorage.getItem(keyName);
  if (storedValue) {
    let stringValue = storedValue.includes("{")
      ? JSON.parse(storedValue)
      : storedValue;
    return { status: true, value: stringValue };
  } else {
    return { status: false, value: "no data found" };
  }
};
