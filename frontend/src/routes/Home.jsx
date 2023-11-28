import { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import "../css/Home.css"

export default function Home() {
    useEffect(() => {
        getTask()
    },[])

   
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [inputData, setInputData] = useState({
    })

    const [clicked, setclicked] = useState(false)
    const [update, setUpdate] = useState(false)

    const [updateData, setUpdateData] = useState({
        title:"",
        description:"",
        _id:""
    })

    const [getTaskdB, setGetTaskdB] = useState([])


    useEffect(() => {
        if (clicked) {
          setInputData({
            title: '',
            description: '',
          });

          setTimeout(() => {
            setclicked(false);
          }, 1000);
        }
      }, [inputData, clicked]);

    const getValue = (e) => {
        let { name, value } = e.target
        setInputData((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        })
        console.log(inputData);
    }

    const getVal = (e) => {
        let { name, value } = e.target
        setUpdateData((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        })
        // console.log(inputData);
    }

    const AddTask = async () => {
        console.log(inputData);
        setclicked(true)
        let result = await fetch("http://localhost:3000/addTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputData)
        })
        result = await result.json()
        console.log(result);
        setInputData({
            title:"",
            description:""
        })
        getTask()

    }

    const getTask =async () => {
        let result= await fetch("http://localhost:3000/getTask", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            // body: JSON.stringify(inputData)
        })
        result = await result.json()
        
        setGetTaskdB(result)
        console.log(getTaskdB);


    }

    const Delete=async(e)=>{
        console.log("hiii");
        console.log(e);

        let result= await fetch(`http://localhost:3000/deleteTask/${e}`,{
            method:"DELETE",
         
        })
        console.log(result);
        getTask()
    }

    const Update=(e)=>{
        console.log(e);
        setUpdate(true)
        setUpdateData({
            title:e.title,
            description:e.description,
            _id:e._id
        })

    }

    const DoneUpdate=async()=>{
        // console.log();
        console.log(updateData);
        let {_id,title,description}=updateData

        let result= await fetch(`http://localhost:3000/updateTask/${_id}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify({title,description})
         
        })
        getTask()
        setUpdateData({
            title:"",
            description:"",
        })
        setUpdate(false)

    }



    return (
        <>
            <div>
                <div className="header_todo">
                To do app
                </div>

                <div className="hero">
                    {!update?
                     <div className="taskDiv">
                     <div className="taskInputHeading">What&apos;s next to do?</div>
                     <div className="taskInputDiv">
                     <input name="title" type="text" placeholder="Enter your task.." onChange={(e) => getValue(e)} value={inputData.title}/>
                     <input name="description" type="text" placeholder="Enter details.." onChange={(e) => getValue(e)} value={inputData.description}/>
                     </div>
                     {clicked? <Button  variant="outlined">Adding Task</Button>:<Button onClick={AddTask} variant="contained">Add Task</Button>}
                 </div>:
                   <div className="updateInput taskDiv">
                   <div className="taskInputHeading">Edit you task!</div>
                   <input name="title" type="text" placeholder="enter updated title" value={updateData.title}  onChange={(e)=>getVal(e)}/>
                       <input name="description" type="text" placeholder="enter updated description" value={updateData.description}  onChange={(e)=>getVal(e)}/>
                       <button onClick={DoneUpdate}>done</button>
                   </div>
                 }
               

              

                <div className="taskList">
                   

                    {getTaskdB.map((e)=>{
                        // console.log(e);
                        return(
                            <div className="TaskdBDiv" key={e._id}>
                                <div>
                                <Checkbox {...label} />
                                <div>
                                <div> {e.title}</div>
                                <div> {e.description}</div>
                                </div>
                                </div>
                                <div>
                                <span onClick={()=>Delete(e._id)}><DeleteForeverIcon className="deleteIcon"></DeleteForeverIcon></span>
                                <span onClick={()=>Update(e)}><EditIcon className="editIcon"></EditIcon></span>
                                </div>

                            </div>

                        )
                    })}
                </div>

                </div>
            </div>
        </>
    )
}