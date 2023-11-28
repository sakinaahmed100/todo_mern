import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate= useNavigate()
    const [inputData, setInputData] = useState({
    })
    const [clicked, setclicked] = useState(false)

    const getValue = (e) => {
        let { name, value } = e.target
        setInputData((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        })
        // console.log(inputData);
    }
    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        pass: '',
        cpass: '',
      });

    useEffect(() => {
        if (clicked) {
          setInputData({
            username: '',
            email: '',
            pass:"",
            cpass:""
          });

          setTimeout(() => {
            setclicked(false);
          }, 1000);
        }
      }, [ clicked]);

      const SignUp=async()=>{
        let result= await fetch("http://localhost:3000/signUp",{
            method:"POST",
            body:JSON.stringify(inputData),
            headers:{
                "Content-type":"application/json"
            }

            

        })
        if (result.status === 400) {
            const errorData = await result.json();
            console.log(errorData);

            setFormErrors(errorData.errors.reduce((errors, error) => {
                // Map each error to its respective form field
                if (error.includes('Username')) {
                  errors.username = error;
                }
                if (error.includes('email')) {
                  errors.email = error;
                }
                if (error.includes('Password')) {
                  errors.pass = error;
                }
                if (error.includes('password matches')) {
                  errors.cpass = error;
                }
                return errors;
              }, {}));
            // setErrors(errorData.errors);
          }
          if (result.status === 200) {
            console.log(await result.json);
            localStorage.setItem("user",JSON.stringify(result))
            navigate("/")

          }
        console.log("signup btn clicked",result);
        setclicked(true)
      }
    return (
        <>
            SignUp

            <form action="">
                <div>
                    <label htmlFor="">Enter your name</label>
                    <input name="username" onChange={(e)=>getValue(e)} value={inputData.username} type="text" />
                    <div className="error">{formErrors?.username}</div>
                </div>

                <div>
                    <label htmlFor="">Enter your email</label>
                    <input name="email" onChange={(e)=>getValue(e)} value={inputData.email} type="text" />
                    <div className="error">{formErrors?.email}</div>

                </div>

                <div>
                    <label htmlFor="">Enter your password</label>
                    <input name="pass" onChange={(e)=>getValue(e)} value={inputData.pass} type="text" />
                    <div className="error">{formErrors?.pass}</div>

                </div>

                <div>
                    <label htmlFor="">Confirm password</label>
                    <input name="cpass" onChange={(e)=>getValue(e)} value={inputData.cpass} type="text" />
                    <div className="error">{formErrors?.cpass}</div>

                </div>
            </form>

            {clicked? <Button  variant="outlined">Registering</Button>:<Button onClick={SignUp} variant="contained">SignUp</Button>}

        </>

    )
}