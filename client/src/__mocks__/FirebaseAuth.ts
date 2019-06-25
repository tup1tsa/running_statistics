export interface User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  uid: string;
}

class FirebaseAuthMock {
  public user: User;

  constructor() {
    this.user = {
      displayName: null,
      email: null,
      emailVerified: false,
      photoURL: null,
      uid: ""
    };
  }

  public onAuthStateCallback: (user: User) => void = () => null;

  public updateCurrentUser(user: User) {
    this.user = user;
    this.onAuthStateCallback(user);
  }

  public onAuthStateChanged(callback: (user: User) => void) {
    this.onAuthStateCallback = callback;
  }
}

export default FirebaseAuthMock;
