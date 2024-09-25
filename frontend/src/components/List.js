import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { baseURL } from './util';

import '../App.css'
import axios from "axios"
const List = (props) => {
    const { id, data, updateUi, editTask } = props;
    console.log("list data====>", id);
        console.log("list data====>", data);
    console.log("list data====>", updateUi);

    const deleteTask = async(id) => {
        try {
            const resData = await axios.delete(`${baseURL}/delete/${id}`); 
            console.log(resData.data)
            updateUi();
        } catch (error) {
            console.log("errror in delete===>",error)
        }
    }
    
    return (
        <li className="eachItem" key={data._id}>
          <h3 className="hedingEachTs">{data.task}</h3>
          <div>
            <MdDelete
              className="iconStyle"
              onClick={() => deleteTask(data._id)}
            />
            <MdModeEdit
              className="iconStyleedit"
              onClick={() => editTask(data._id, data.task)}
            />
          </div>
        </li>
    );
};

export default List