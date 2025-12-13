import multer from "multer"
import fs from 'fs'
import path from 'path'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')

// Ensure public directory exists so multer can write files into it
if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PUBLIC_DIR)
    },
    filename: (req, file, cb) => {
        // Use a timestamp prefix to avoid collisions and keep original extension
        const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`
        cb(null, uniqueName)
    }
})

const upload = multer({ storage })
export default upload