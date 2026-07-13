import {v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dnvpt1zxh',
  api_key: process.env.CLOUDINARY_API_KEY || '325436864586722',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'NpVGJMO3QvvOqBHNbW0-vfAxOro',
});

const uploadOnClodinary =async (localFilePath) =>{
  try {
    console.log(localFilePath)
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath,{
      resource_type:"auto"
    })

    fs.unlinkSync(localFilePath)

    return response
    
  } catch (error) {
    fs.unlinkSync(localFilePath)
    return null
  }
}


const deleteOnCloudinary = async(publicId)=>{
    try {

      if(!publicId) return null;

      const result = await cloudinary.uploader.destroy(publicId)

      return result;

    } catch (error) {
        console.log("Cloudinary delete error:", error);
        return null
    }
}

export {uploadOnClodinary,deleteOnCloudinary}