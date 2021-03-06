import axios from "axios";

export const registration = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/auth/registration`,
      {
        email,
        password,
      }
    );
    console.log(response.data.message);
  } catch (e) {
    alert(e);
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`http://localhost:5000/api/auth/login`, {
    email,
    password,
  });
  localStorage.setItem("token", response.data.token);

  return response.data;
};
