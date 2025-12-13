import express from 'express';
import { createCourse, getPublicCourses ,getCreatorCourses, editCourse, getCourseById, removeCourse, setCoursePublish } from '../controller/courseController';
import isAuth  from '../middleware/isAuth';
import upload from '../middleware/multer';
const courseRouter=express.Router()

courseRouter.post('/create',isAuth,createCourse)
courseRouter.get("/getpublished",getPublicCourses)
courseRouter.get("/getcreator",isAuth,getCreatorCourses)
courseRouter.post("/editCourse",isAuth,upload.single('thumbnail'),editCourse)
courseRouter.get("/getcourse/:courseId",isAuth,getCourseById)
courseRouter.get("/delete/:remove/:id",isAuth,removeCourse)
courseRouter.patch('/publish/:courseId', isAuth, setCoursePublish)