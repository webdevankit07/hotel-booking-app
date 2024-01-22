import { Router } from 'express';
import { registerUser } from '../controllers/user.controller';

const router = Router();

// Public Routes...
router
    .get('/', (req, res) => {
        res.send({ status: 'User route is running on - 8000/api/v1/user ' });
    })
    .post('/register', registerUser);

// Private Routes...

export { router as userRouter };
