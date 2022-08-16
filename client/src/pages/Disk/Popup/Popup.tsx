import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./Popup.module.scss";
import Input from "../../../components/Input/Input";
import { createFolderRoutine } from "../../../store/fileSlice";
import { useDispatch } from "react-redux";

type PopupProps = {
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
  currentDir: string | null;
};

const Popup: React.FC<PopupProps> = ({ setIsPopupOpen, currentDir }) => {
  const [dirName, setDirName] = useState<string>("");
  const dispatch = useDispatch();
  console.log(currentDir);
  return (
    <div
      className={styles.popup}
      onClick={() => {
        setIsPopupOpen(false);
      }}
    >
      <div
        className={styles.popup__content}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={styles.popup__header}>
          <div className={styles.popup__title}>Создать новую папку</div>
          <button
            className={styles.popup__close}
            onClick={() => {
              setIsPopupOpen(false);
            }}
          >
            X
          </button>
        </div>
        <Input
          onChange={setDirName}
          value={dirName}
          type="text"
          placeholder="Введите название папки"
        />
        <button
          className={styles.popup__create}
          onClick={() => {
            dispatch(createFolderRoutine({ dirId: currentDir, name: dirName }));
            setIsPopupOpen(false);
          }}
        >
          Создать
        </button>
      </div>
    </div>
  );
};

export default Popup;
