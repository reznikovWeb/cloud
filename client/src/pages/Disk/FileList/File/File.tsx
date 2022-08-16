import React from "react";
import styles from "./File.module.scss";
import Folder from "../../../../assets/images/folder.svg";
import Page from "../../../../assets/images/page.svg";
import { IFile, pushToStack, updateCurrentDir } from "../../../../store/fileSlice";
import {useDispatch, useSelector} from "react-redux";
import {currentDirSelector} from "../../../../store/selectors/file.selectors";

type FileProps = {
  file: IFile;
};

const File: React.FC<FileProps> = ({ file }) => {
  const dispatch = useDispatch();

  const currentDir = useSelector(currentDirSelector);

  const openDirHandler = () => {
    dispatch(pushToStack(currentDir))
    dispatch(updateCurrentDir(file._id));
  };
  return (
    <div
      className={styles.file}
      onClick={() => {
       file.type === 'dir' && openDirHandler();
      }}
    >
      <img
        className={styles.file__img}
        src={file.type === "dir" ? Folder : Page}
        alt=""
      />
      <div className={styles.file__name}>{file.name}</div>
      <div className={styles.file__date}>{file.date.slice(0, 10)}</div>
      <div className={styles.file__size}>{file.size}</div>
    </div>
  );
};

export default File;
