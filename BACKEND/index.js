const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors=require("cors")
const { isAlphanumeric, isLength, isEmail,isStrongPassword  } = require('validator');
const port = process.env.PORT || 3000;
app.use(cors())

mongoose.connect('mongodb+srv://sakinaahmed100:needhelp10@cluster0.nw8i9w5.mongodb.net/', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Adjust this value
    socketTimeoutMS: 30000,  // Adjust this value
  });

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    // completed: Boolean,
    createdAt: { type: Date, default: Date.now },
  });

  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
   
    },
    email: {
      type: String,
      required: true,
 
    },
    pass: {
      type: String,
      required: true,
    },
    cpass: {
      type: String,
      required: true
    }
  });
  
  
  // Create a Task model
  const Task = mongoose.model('Task', taskSchema);
  const User = mongoose.model('User', userSchema);
  app.use(express.json());

app.post("/signUp", async(req, res) => {
  console.log(req.body);
  const errors = [];
  let {username,email,pass,cpass}=req.body

  if (!isAlphanumeric(username)) {
    errors.push('Username can only contain letters and numbers.');
  }

  if (!isLength(username, { min: 3, max: 20 })) {
    errors.push('Username must be between 3 and 20 characters.');
  }

  if (!isEmail(email)) {
    errors.push('Invalid email address format. Please enter a valid email.');
  }

  if (!isLength(pass, { min: 8 })) {
    errors.push('Password must be at least 8 characters long.');
  } else if (!isStrongPassword(pass)) {
    errors.push('Password is not strong enough. It should contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
  }

  if (pass !== cpass) {
    errors.push('Make sure your password matches.');
  }

  if (errors.length > 0) {
    // If there are errors, send them as a response to the client.
    return res.status(400).json({ errors });
  } else {
    // Proceed with user registration.
    console.log('User is valid!');
    const user = await User.findOne({ email: email });

    if (user) {
      errors.push('User  already exists in the database');
      return res.status(400).json({ errors });

    } else {
      console.log(" // Email doesnot exists in the database");     
      const user= new User(req.body)
let newUser = await user.save();
console.log(newUser);
res.status(200).json(newUser);
    }

  }

})

app.post('/addTask', async(req, res) => {
    // console.log(req.body);
const task= new Task(req.body)
let savedTask = await task.save();
savedTask = res.json(savedTask);
// console.log(savedTask);

})

app.get('/getTask', async(req, res) => {
    // console.log(req.body);
const task=await Task.find()
// console.log(task);
savedTask = res.json(task);
// console.log(savedTask);

})

app.delete('/deleteTask/:q', async(req, res) => {
const task=await Task.deleteOne({_id:req.params.q})
savedTask = res.json(task);
// console.log(savedTask);

})


app.patch('/updateTask/:q', async(req, res) => {
  console.log(req.params.q);
  console.log(req.body);
  const updatedResource = await Task.findByIdAndUpdate(req.params.q, req.body, {
    new: true, // Return the updated document
  });

 let updateVal= res.json(updatedResource);
//  console.log(updateVal);
  
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})