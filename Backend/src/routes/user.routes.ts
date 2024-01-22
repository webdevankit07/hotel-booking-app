import { Router } from 'express';

const router = Router();

// Public Routes...
router.get('/', (req, res) => {
    res.send({ Name: 'Ankit Kumar Yadav' });
});

// Private Routes...

export { router as userRouter };
