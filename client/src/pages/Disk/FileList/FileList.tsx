import React from "react";
import styles from "./FileList.module.scss";
import File from "./File/File";
import { useSelector } from "react-redux";
import { filesSelector } from "../../../store/selectors/file.selectors";

const FileList: React.FC = () => {
  const files = useSelector(filesSelector);

  return (
    <div className={styles.fileList}>
      <div className={styles.fileList__header}>
        <div className={styles.fileList__name}>Название</div>
        <div className={styles.fileList__date}>Дата</div>
        <div className={styles.fileList__size}>Размер</div>
      </div>
      {files.map((file,index) => (
          <File key={index} file={file}/>
      ))}
    </div>
  );
};

export default FileList;
