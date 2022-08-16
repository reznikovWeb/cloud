import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createFolderRoutine,
  getFilesRoutine,
  popToStack,
  updateCurrentDir,
} from "../../store/fileSlice";
import {
  currentDirSelector,
  dirStackSelector,
} from "../../store/selectors/file.selectors";
import styles from "./Disk.module.scss";
import FileList from "./FileList/FileList";
import Popup from "./Popup/Popup";
import Header from "../../components/Header/Header";

const Disk: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const currentDir = useSelector(currentDirSelector);
  //Массив папок в которых мы были (без последней в которой находимся)
  const dirStack = useSelector(dirStackSelector);

  const handleGoBack = () => {
    if (dirStack.length !== 0) {
      dispatch(updateCurrentDir(dirStack[dirStack.length - 1]));
      dispatch(popToStack());
    }
  };

  // В зависимости от папки будут меняться наши файлы
  useEffect(() => {
    dispatch(getFilesRoutine(currentDir));
  }, [currentDir]);

  return (
    <>
      <Header />
      <div className={styles.disk}>
        <div className={styles.disk__btns}>
          <button
            className={styles.disk__back}
            onClick={() => {
              handleGoBack();
            }}
          >
            Назад
          </button>
          <button
            className={styles.disk__create}
            onClick={() => {
              setIsPopupOpen(true);
            }}
          >
            Создать папку
          </button>
        </div>
        <FileList />
        {isPopupOpen && (
          <Popup setIsPopupOpen={setIsPopupOpen} currentDir={currentDir} />
        )}
      </div>
    </>
  );
};

export default Disk;
