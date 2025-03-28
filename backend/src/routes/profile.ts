import express from 'express';
import { Profile } from '../controllers/profile';
import { authenticate, validateProfileOwnership } from '../middleware/profile';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Get profile
router.get(
  '/', 
  authenticate, 
  validateProfileOwnership, 
  (req, res, next) => {
    Profile.getProfile(req, res).catch(next);
  }
);

// Update profile
router.put(
  '/', 
  authenticate, 
  validateProfileOwnership, 
  (req, res, next) => {
    Profile.updateProfile(req, res).catch(next);
  }
);

// Upload profile image
router.post(
  '/image', 
  authenticate, 
  validateProfileOwnership, 
  upload.single('image'),
  (req, res, next) => {
    Profile.uploadProfileImage(req, res).catch(next);
  }
);

export default router;