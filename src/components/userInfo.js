export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, {getUserData}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);

    this._getUserData = getUserData;
  }

  getUserInfo() {
    return this._getUserData();
  }

  setUserInfo(name, about) {
    this._userNameElement.textContent = name;
    this._userAboutElement.textContent = about;
  }

  showUserInfo(name, about) {
    this._userNameElement.textContent = name;
    this._userAboutElement.textContent = about;
  }

  updateUserInfo(data) {
    this.id = data._id;
  }

  getUserId() {
    return this.id;
  }

}