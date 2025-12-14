import express from 'express';
import { createCourse, getPublicCourses ,getCreatorCourses, editCourse, getCourseById, removeCourse, setCoursePublish } from '../controller/courseController.js';
import isAuth  from '../middleware/isAuth.js';
import upload from '../middleware/multer.js';
const courseRouter=express.Router()

// Allow thumbnail upload when creating a course
courseRouter.post('/create', isAuth, upload.single('thumbnail'), createCourse)
courseRouter.get("/getpublished",getPublicCourses)
courseRouter.get("/getcreator",isAuth,getCreatorCourses)
// Edit a course by id (supports thumbnail upload)
courseRouter.post("/editCourse/:courseId", isAuth, upload.single('thumbnail'), editCourse)
courseRouter.get("/getcourse/:courseId",isAuth,getCourseById)
// Standardize delete route to use :courseId so frontend calls match
courseRouter.delete("/delete/:courseId", isAuth, removeCourse)
courseRouter.patch('/publish/:courseId', isAuth, setCoursePublish)


export default courseRouter