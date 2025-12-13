import uploadOnCloudinary from '../config/cloundinay.js'
import path from 'path'
import User from '../model/userModel.js'

export const getCurrentUser = async (req, res) => {
    try {
        if (!req.userId) return res.status(401).json({ message: 'Unauthorized: missing userId' })
        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json({ user })

    } catch (error) {
        console.error('getCurrentUser error:', error)
        return res.status(500).json({ message: `get current user error ${error.message || error}` })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId=req.userId
        if (!userId) return res.status(401).json({ message: 'Unauthorized: missing userId' })
        const { name, description, email } = req.body
        let photourl
        if (req.file){
            photourl = await uploadOnCloudinary(req.file.path)
            if (!photourl) {
                console.error('Cloudinary upload failed for file:', req.file.path)
                // Fallback: serve the locally uploaded file from the backend's /public route
                const localUrl = `${req.protocol}://${req.get('host')}/public/${path.basename(req.file.path)}`
                console.warn('Falling back to local file URL:', localUrl)
                photourl = localUrl
            } else {
                console.log('Cloudinary returned URL:', photourl)
            }
        }
        const updateFields = {}
        if (name) updateFields.name = name
        if (description) updateFields.description = description
        if (email) updateFields.email = email
        if (photourl) updateFields.photourl = photourl

            console.log('Updating user fields:', updateFields)

        const user = await User.findOneAndUpdate({ _id: userId }, updateFields, { new: true })
        if (!user){
            return res.status(404).json({message:'User not found'})

        }
        return res.status(200).json(user)
    }catch (error){
        return res.status(500).json({message:`update profile error ${error}`}

        )
        

    }
}