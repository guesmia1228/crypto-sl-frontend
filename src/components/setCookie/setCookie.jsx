import Cookie from "js-cookie";

const setCookie = (name, value, exp = 30) => {
  Cookie.set(name, value, {
    expires: exp,
    secure: false,
    sameSite: "strict",
    path: "/",
  });
};
export default setCookie;
