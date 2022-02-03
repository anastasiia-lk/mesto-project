export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector, {getUserData, handleSetAvatar}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);

    this._getUserData = getUserData;
    this._handleSetAvatar = handleSetAvatar;
  }

  getUserInfo() {
    return this._getUserData();
  }

  setUserInfo(name, about) {
    this._userNameElement.textContent = this.data.name;
    this._userAboutElement.textContent = this.data.about;
  }

  showUserInfo(name, about, avatar) {
    this._userNameElement.textContent = name;
    this._userAboutElement.textContent = about;
    this._userAvatarElement.setAttribute('src', avatar);
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

}