import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilesRoutine } from "../../store/fileSlice";
import { currentDirSelector } from "../../store/selectors/file.selectors";

const Disk: React.FC = () => {
  const dispatch = useDispatch();

  const currentDir = useSelector(currentDirSelector);

  useEffect(() => {
    dispatch(getFilesRoutine(currentDir));
  }, [currentDir]);

  return <div>DISK</div>;
};

export default Disk;
