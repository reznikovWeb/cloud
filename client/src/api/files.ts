import axios from "axios";

export const getFiles = async (dirId: { dirId: string | null }) => {
  // Если находимся в корневой папке, то id будет пустой
  const response = await axios.get(
    `http://localhost:5000/api/files${dirId ? "?parent=" + dirId : ""}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data;

};
