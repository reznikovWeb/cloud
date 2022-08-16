import axios from "axios";
import {IFile} from "../store/fileSlice";

export const getFiles = async (dirId: string | null) => {
  // Если находимся в корневой папке, то id будет пустой
  const response = await axios.get(
    `http://localhost:5000/api/files${dirId ? "?parent=" + dirId : ""}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data;
};

export const createDir = async ({
  dirId,
  name,
}: {
  dirId: string | null;
  name: string;
}) => {
  // Если находимся в корневой папке, то id будет пустой

  const response = await axios.post<IFile>(
    `http://localhost:5000/api/files`,
    {
      name,
      parent: dirId,
      type: "dir",
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data;
};
