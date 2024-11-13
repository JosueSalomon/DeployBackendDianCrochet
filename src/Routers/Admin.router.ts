import { Router } from 'express';
import upload from '../Utils/upload'; 
import { uploadImage,LoginAdmin } from '../Controllers/Admin.controller'; 

const router = Router();


router.post('/upload', upload.single('file'), uploadImage);
router.post('/login', LoginAdmin);


export default router;
