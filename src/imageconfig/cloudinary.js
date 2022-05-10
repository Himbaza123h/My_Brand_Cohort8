import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:true,
});
const uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.UploadStream.Upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            });
        }, {
            resource_type: "auto",
            folder: folder

        })
    })
}
export default cloudinary;