import axios from 'axios';
import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../../App';
import { toast } from 'react-toastify';

function CreateCourses() {
        const navigate = useNavigate();

        // State to hold form data
        const [courseTitle, setCourseTitle] = useState('');
        const [courseCategory, setCourseCategory] = useState('');
        const [courseDescription, setCourseDescription] = useState('');
        const [thumbnailFile, setThumbnailFile] = useState(null);
        const [loading, setLoading] = useState(false);

        const handleCreateCourse = async (e) => {
                e?.preventDefault();
                if (!courseTitle || !courseCategory) return toast.error('Title and category are required');
                setLoading(true);
                try {
                        const fd = new FormData();
                        fd.append('title', courseTitle);
                        fd.append('category', courseCategory);
                        fd.append('description', courseDescription || '');
                        if (thumbnailFile) fd.append('thumbnail', thumbnailFile);

                        const res = await axios.post(`${serverURL}/api/course/create`, fd, {
                                withCredentials: true,
                                headers: { 'Content-Type': 'multipart/form-data' },
                        });

                        toast.success('Course created successfully');
                        navigate('/courses');
                } catch (error) {
                        console.error('Create course failed', error);
                        toast.error(error.response?.data?.message || 'Create course failed');
                }
                setLoading(false);
        };

    // Note: Tailwind CSS classes are used for styling

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-xl w-full max-w-md">
                
                {/* Header */}
                <header className="flex items-center mb-8">
                    {/* Back Button (Using Lucide-React Icon) */}
                    <button 
                        className="text-gray-900 mr-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Go back"
                        onClick={() => navigate(-1)}
                    >
                        <IoArrowBack size={20} />
                    </button>
                    
                    <h1 className="text-xl font-semibold text-gray-900">
                        Create Course
                    </h1>
                </header>

                {/* Form */}
                <form onSubmit={handleCreateCourse} className="space-y-6">
                    
                    {/* Course Title Input */}
                    <div>
                        <label 
                            htmlFor="course-title" 
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Course Title
                        </label>
                        <input
                            type="text"
                            id="course-title"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            placeholder="Enter Course title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                                       placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                            required
                        />
                    </div>

                    {/* Course Category Dropdown */}
                    <div>
                        <label 
                            htmlFor="course-category" 
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Course Category
                        </label>
                        <div className="relative">
                            <select
                                id="course-category"
                                value={courseCategory}
                                onChange={(e) => setCourseCategory(e.target.value)}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                                           text-gray-900 appearance-none bg-white 
                                           focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                required
                            >
                                <option value="" disabled>Select Category</option>
                                    <option value="web-development">Web Development</option>
                                    <option value="ui-ux-designing">UI/UX Designing</option>
                                    <option value="app-development">App Development</option>
                                    <option value="ethical-hacking">Ethical Hacking</option>
                                    <option value="ai-ml">AI/ML</option>
                                    <option value="data-science">Data Science</option>
                                    <option value="data-analytics">Data Analytics</option>
                                    <option value="ai-tools">AI Tools</option>
                            </select>
                            {/* Custom Dropdown Arrow (for better design consistency) */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="course-desc" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea id="course-desc" value={courseDescription} onChange={e => setCourseDescription(e.target.value)} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Short course description (optional)" />
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">Thumbnail (optional)</label>
                        <input id="thumbnail" type="file" accept="image/*" onChange={e => setThumbnailFile(e.target.files[0] || null)} />
                    </div>

                    {/* Create Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-8 py-3 bg-black text-white font-semibold rounded-md 
                                   hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-60"
                    >
                        {loading ? 'Creating...' : 'Create'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateCourses;