export default class UserInfo {
  constructor(data) {
    this.name = data.name;
    this.about = data.about;
    this.avatar = data.avatar;
    this.userId = data._id;
  }

  getUserId() {
    return this.userId;
  }

  printUser() {
    console.log(this);
  }
}