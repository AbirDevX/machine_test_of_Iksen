class UserDto {
  constructor(user) {
    this._id = user._id;
    this.name = user.name;
    this.userName = user.userName;
    this.email = user.email;
    this.mobile = user.mobile;
    this.role = user.role;
    this.avatar = user.avatar;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

module.exports = { UserDto };
