export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector, {getUserData, handleSetAvatar, handleSetUser}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);

    this._getUserData = getUserData;
    this._handleSetAvatar = handleSetAvatar;
    this._handleSetUser = handleSetUser;
  }

  getUserInfo() {
    return this._getUserData();
  }

  updateUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._userAboutElement.textContent = data.about;
    this._userAvatarElement.setAttribute('src', data.avatar);
    this.id = data._id;
  }

  getUserId() {
    return this.id;
  }

  setUserAvatar(avatar) {
    this._handleSetAvatar(avatar);
  }

  setUserData(name, about) {
    this._handleSetUser(name, about)
  }

}