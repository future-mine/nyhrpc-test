import { configure, makeAutoObservable } from "mobx";

const authUserStr = "authUser";
export default class UserStore {
  authUser = {};
  constructor() {
    makeAutoObservable(this);
    this.load();
  }

  static getInstance() {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }
    return UserStore.instance;
  }

  save = () =>
    window.sessionStorage.setItem(authUserStr, JSON.stringify(this.authUser));

  load = () => {
    Object.assign(
      this.authUser,
      JSON.parse(window.sessionStorage.getItem(authUserStr) || "{}")
    );
    if (this.authUser != undefined) {
      this.id = this.authUser.uid;
    }
  };

  setAuthUser = (authUser) => {
    this.authUser = authUser;
    this.save();
  };
  clearAuthUser = () => {
    this.authUser = {};
    this.save();
  };
}
