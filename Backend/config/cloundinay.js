import { v2 as cloudinary } from 'cloudinary'


const uploadOnCloudinary =async(filePath,)=>{
    cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

}
try{

    if (!filePath){
        return null
    }
    const uploadresult=await cloudinary.uploader.upload(filePath,{resource_type:"auto"})
    return uploadresult.secure_url
}catch(error){
    console.log(error)
}

