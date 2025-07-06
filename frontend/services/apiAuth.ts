type traditionalSignUp = {
  username: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
};

const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://127.0.0.1" : "";

export async function signUpTraditional(newUser: traditionalSignUp) {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error(err);
    }
  }
}
