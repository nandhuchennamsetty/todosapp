import { useState, useEffect } from "react";
import ".././App.css";

import axios from "axios";
import { baseURL } from "./util";
import List from "./List";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function TodoMain() {
  const [valueTask, setValueTask] = useState("");
  const [updateUi, setUpdateUi] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [updatedId, setUpdatedId] = useState(null);
  const [page, setPage] = useState(1);

  const getItemsPerPage = () => {
    return window.innerWidth >= 768 ? 12 : 8;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseURL}/get`);
        console.log("get data", res);
        setTaskData(res.data);
      } catch (err) {
        console.log("error for getting data==>", err);
      }
    };
    fetchData();
  }, [updateUi]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const addTask = async () => {
    try {
      await axios.post(`${baseURL}/save`, { task: valueTask }).then((res) => {
        console.log(res.data);
        console.log(res.status);
      });
      setUpdateUi((prevState) => !prevState);
      setValueTask("");
    } catch (err) {
      console.log("error posting Data===>", err);
    }
  };
  const onUpadedUi = () => {
    setUpdateUi((prevSt) => !prevSt);
  };
  const editTask = (id, task) => {
    setUpdatedId(id);
    setValueTask(task);
  };
  const updateTask = async () => {
    try {
      const resData = await axios.put(`${baseURL}/update/${updatedId}`, {
        task: valueTask,
      });
      console.log("resData==>", resData.data);
      setValueTask("");
      setUpdateUi((prevSt) => !prevSt);
      setUpdatedId(null);
    } catch (err) {
      console.log("update error===>", err);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedData = taskData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="mainContainer">
      <h1 className="main-heading"></h1>
      <div className="miniContainer">
        <input
          className="inputContainer"
          onChange={(e) => setValueTask(e.target.value)}
          value={valueTask}
          placeholder="Write Here...."
        />
        <button className="btnStyle" onClick={updatedId ? updateTask : addTask}>
          {updatedId ? "Update Task" : "Add Task"}
        </button>
      </div>
      <div>
        <ul className="ulList">
          {paginatedData?.map((each) => {
            console.log("each==>", each.task);
            return (
              <List
                key={each._id}
                id={each._id}
                data={each}
                updateUi={onUpadedUi}
                editTask={editTask}
              />
            );
          })}
        </ul>
        <div className="paginationStyle">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(taskData.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              size="small"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default TodoMain;
