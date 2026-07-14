import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnClodinary } from "../utils/cloudinary.js";

//register

const register = asyncHandler(async (req, res) => {
  const { username, email, name, password } = req.body;

  if (!username || !email || !name || !password) {
    throw new ApiError(500, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.file?.path;

  console.log(avatarLocalPath);
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnClodinary(avatarLocalPath);

  const user = await User.create({
    username: username.toString(),
    email,
    name,
    avatar: avatar.url,
    password,
  });

  const registeredUser = await User.find({ email }).select(
    "-password -refreshToken",
  );

  return res.status(200).json({
    success: true,
    message: "user registered successfully",
    registeredUser,
  });
});

//login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(401, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "user not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid user Credentials");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  const dbUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );



  const options = {
    httpOnly: true,
    secure: false,
    sameSite:'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  };

  return res.status(200).cookie("refreshToken", refreshToken,options).json({
    success: true,
    message: "Login successfully",
    accessToken,
    user: dbUser,
  });
});


// refresh-access-token
const refreshAccessToken = async (req, res, next) => {

  const refreshToken = req.cookies?.refreshToken ;

  // console.log(refreshToken)
  
  if (!refreshToken) {
    return next(new ApiError(401, "Unauthorized request"));
  }

  try {
    const decodeToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

    const user = await User.findById(decodeToken?._id);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    if (refreshToken !== user?.refreshToken) {
      return next(new ApiError(401, "Refresh token is expired or used"));
    }

   const options = {
    httpOnly: true,
    secure: false,
    sameSite:'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  };

    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    const dbUser = await User.findById(user._id).select("-password -refreshToken");

    return res
      .status(200)
      .cookie("refreshToken", newRefreshToken, options) 
      .json({
        success: true,
        accessToken,
        user:dbUser
      });

  } catch (error) {
    return next(new ApiError(401, error?.message || "Invalid refresh token"));
  }

};

//logout
const logout = asyncHandler(async(req,res)=>{

   await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            returnDocument: "after"
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      success:true,
      message:"user logout successfully"
    })
})




export { register, login,refreshAccessToken,logout };
