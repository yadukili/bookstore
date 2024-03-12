import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import { User } from "./models/userModel.js"

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);



app.post('/signup',async(request,response)=>{
  try {
      if (
        !request.body.email ||
        !request.body.password 
      ) {
        return response.status(400).send({
          message: 'Send all required fields: email, password',
        });
      }
      const newUser= {
        email: request.body.email,
        password: request.body.password,
        
      };
  
     const user =await User.create(newUser);
      return response.status(201).send(user)
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.post('/login',async(request,response)=>{
  const {email, password} = request.body;
  User.findOne({email:email})
  .then(user=>{
    if (user)
      {
      if (user.password === password)
         {
          response.json("success")
         }
      else
        {
          response.json("wrong password")

        }   
      }  
   else  
   {
     response.json("user not found")
   }
  
})
})
    





app.use('/books', booksRoute);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
