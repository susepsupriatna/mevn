export default function AuthHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    // for node js express backend
    return { "x-access-token": user.accessToken };

    //   for except node js express backend
    // return { Authorization: "Bearer" + user.accessToken };
  } else {
    return {};
  }
}
