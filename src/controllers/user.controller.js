import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from"../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req,res) => {
// get user details from frontend
// validation - not empty
//check if user exists: username, email
//check for image, check for avatar
//upload them to cloudinary, avatar
//create user object - create entru in db
//remove password and refresh token field from response
//check for user creation
//return response


//  Get user details from frontend
const {fullName,email,username,password } = req.body;
// validation
if(
    [fullName, email,username,password].some((field) => field?.trim() === "")  
)
{
    return res.status(400).json({
        message: "all fields are required",
    });
}

//Check if user already exists
const existedUser = await User.findOne({
    $or: [{ username },{ email }]
})
if(existedUser){
    throw new ApiError(409,"user already exixted!")
}

// Check avatar image
const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is reuired");
}

// Upload avatar to Cloudinary
const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImage = await uploadOnCloudinary(coverImageLocalPath);
if(!avatar){
     throw new ApiError(400,"Avatar file is reuired");
}

// Create user object in DB
const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username : username.lowercase,
})


//Remove password & refreshToken
const createdUser = await User.findById(user._id).select("-password -refreshToken"
)

// Check user creation
    if(!createdUser){
        throw new ApiError(500,"something went wrong while registring the user");
        
    }

    //Return response
    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registerd successfully")
    )

})

export default registerUser;