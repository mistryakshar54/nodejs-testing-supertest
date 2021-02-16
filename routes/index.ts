import { Router, Request , Response } from 'express';
import { body,validationResult } from 'express-validator';

const router = Router();
const reqValidationProps = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min : 4 , max: 20 }).withMessage("Password must be min 4 and max 20 chars")
];

router.post('/signup' , reqValidationProps, async(req : Request , res : Response) => {
    const {email , password} = req.body; 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Handle Create user logic here with the DB
    req.session = {
        jwt : "My JWT Token Here"
    }
    //Store the session
    res.status(201).send({ message : 'success', data : {email} });
});

router.post('/signout' , (req, res) => {
    req.session = null;
    res.status(200).send({ message : 'success', data : 'User signed out!' });
});

export {router as authRoutes};