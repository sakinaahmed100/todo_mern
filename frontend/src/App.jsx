import {Route,Routes,BrowserRouter} from "react-router-dom"
import './App.css'
import Home from "./routes/Home"
import SignUp from "./routes/SignUp"
import SignIn from "./routes/SignIn"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={Home}></Route>
      <Route path="/signup" Component={SignUp}></Route>
      <Route path="/signin" Component={SignIn}></Route>
    </Routes>
    </BrowserRouter>
   
   
    </>
  )
}

export default App
