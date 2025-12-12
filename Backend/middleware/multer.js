import multer  from "multer"

let storage =multer.diskstorage({

    destination:(req,file,cb)=>{
        cb(null,'./public')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({storage:storage})
export default upload