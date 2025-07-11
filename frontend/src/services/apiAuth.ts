type traditionalSignUp = {
  username: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
  authProvider: string;
};

type traditionalLogIn = {
  usernameOrEmail: string;
  password: string;
};

const BASE_URL =
  process.env.NODE_ENV == "development" ? "http://127.0.0.1:3000" : "";

export async function signUpTraditional(newUser: traditionalSignUp) {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      throw err;
    } else {
      console.log(err);
      throw new Error("Unknown Error");
    }
  }
}

export async function logInTraditional(userInfo: traditionalLogIn) {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      throw err;
    } else {
      console.log(err);
      throw new Error("Unknown Error");
    }
  }
}
