import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'


const uploadOnCloudinary = async (filePath, maxRetries = 2) => {
    // Ensure cloudinary is configured from env once
    const clean = (v) => typeof v === 'string' ? v.replace(/^\"|\"$/g, '') : v
    cloudinary.config({
        cloud_name: clean(process.env.CLOUDINARY_NAME),
        api_key: clean(process.env.CLOUDINARY_API_KEY),
        api_secret: clean(process.env.CLOUDINARY_API_SECRET),
    })

    if (!filePath) return null

    const tryUploadStream = () => new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
        const readStream = fs.createReadStream(filePath)
        readStream.on('error', (e) => reject(e))
        readStream.pipe(uploadStream)
    })

    let attempt = 0
    while (attempt <= maxRetries) {
        try {
            attempt++
            const result = await tryUploadStream()
            // remove temporary file after successful upload
            if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath)
            return result.secure_url
        } catch (error) {
            // Log useful details for debugging and retry for transient errors
            console.error(`Cloudinary upload attempt ${attempt} failed for file: ${filePath}`)
            console.error(error && error.error ? error.error : error)
            // If last attempt, clean up and return null
            if (attempt > maxRetries) {
                if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath)
                return null
            }
            // Small backoff before retrying
            await new Promise(r => setTimeout(r, 1000 * attempt))
        }
    }
}

export default uploadOnCloudinary