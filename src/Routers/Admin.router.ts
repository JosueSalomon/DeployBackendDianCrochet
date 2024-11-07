import { Router } from 'express';
import upload from '../Utils/upload'; 
import { uploadImage } from '../Controllers/Admin.controller'; 

const router = Router();


router.post('/upload', upload.single('file'), uploadImage); 

export default router;
