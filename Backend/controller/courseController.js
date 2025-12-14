import uploadOnCloudinary from "../config/cloundinay.js"
import Course from "../model/courseModel.js"

export const createCourse = async (req, res) => {
    try {
        const { title, category, description } = req.body
        if (!title || !category) {
            return res.status(400).json({ message: "title and category are required" })
        }

        // If a thumbnail file is provided, upload to Cloudinary and store URL
        let thumbnail
        if (req.file) {
            try {
                thumbnail = await uploadOnCloudinary(req.file.path)
            } catch (err) {
                // Log and continue; course can be created without cloud thumbnail
                console.error('Cloudinary upload failed:', err)
            }
        }

        const courseData = {
            title,
            category,
            description,
            creator: req.userId
        }
        if (thumbnail) courseData.thumbnail = thumbnail

        const course = await Course.create(courseData)

        return res.status(201).json({ course })
    } catch (error) {
        return res.status(500).json({ message: `create course error ${error.message || error}` })
    }
}
export const getPublicCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true })
        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: "No courses found" })
        }
        return res.status(200).json({ courses })
    } catch (error) {
        return res.status(500).json({ message: `fail to find the public courses ${error.message || error}` })
    }
}
export const getCreatorCourses =async (req,res)=>{
    try{
        const userId=req.userId
        const courses=await Course.find({creator:userId})
         if (!courses || courses.length === 0) {
            return res.status(404).json({ message: "No courses found" })
        }
        return res.status(200).json({ courses })

    }catch(error){
        return res.status(500).json({ message: `fail to find the creator courses ${error.message || error}` })

    }
}
export const editCourse=async(req,res)=>{
    try{
        const {courseId}=req.params
        const {title,subtitle,description,category,level,price,isPublished}=req.body
        let thumbnail
        if (req.file){
            thumbnail= await uploadOnCloudinary(req.file.path)

        }
        let course=await Course.findById(courseId)
        if (!course){
            return res.status(404).json({message:'course not found'})

        }

        const updateData={title,subtitle,description,category,level,price,isPublished,thumbnail}
        course=await Course.findByIdAndUpdate(courseId,updateData,{new:true})
        return res.status(200).json({course})
    }
    catch(error){
        return res.status(500).json({ message: `fail to edit ${error.message || error}` })

    }

}
export const getCourseById=async(req,res)=>{
    try{
        const {courseId}=req.params
        let course=await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        return res.status(200).json({ course })
    } catch (error) {
        return res.status(500).json({ message: `fail to get course by id ${error.message || error}` })
    }
}

export const removeCourse=async(req,res)=>{
    try{
        const {courseId}=req.params
        let course=await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        await Course.findByIdAndDelete(courseId)
        return res.status(200).json({ message: 'course deleted successfully' })
    } catch (error) {
        return res.status(500).json({ message: `fail to remove course ${error.message || error}` })
    }
}
export const setCoursePublish = async (req, res) => {
    try {
        const { courseId } = req.params
        const { isPublished } = req.body
        if (typeof isPublished === 'undefined') return res.status(400).json({ message: 'isPublished required' })
        const course = await Course.findByIdAndUpdate(courseId, { isPublished }, { new: true })
        if (!course) return res.status(404).json({ message: 'Course not found' })
        return res.status(200).json({ course })
    } catch (error) {
        return res.status(500).json({ message: `fail to update publish status ${error.message || error}` })
    }
}