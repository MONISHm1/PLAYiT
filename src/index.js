// require('dotenv').config({path:'DOTENV_KEY./env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})
connectDB();