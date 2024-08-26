
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';

const postRegister = async (req, res) => {
    const { username, password, isGuard, phoneNumber, lastSubmitted } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const alreadyExistingUser = await User.findOne({ username });

    if (alreadyExistingUser) {
        console.log("User already exists");
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const user = new User({
        username,
        password: hashedPassword,
        isGuard,
        phoneNumber,
        lastSubmitted
    });

    console.log("Registration end point hit");

    try {
        await user.save();
        req.session.userid = user._id;
        return res.status(201).send('User created successfully');
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        console.log("User not found");
        return res.status(404).send('User not found');
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        console.log("Invalid password");
        return res.status(401).send('Invalid password');
    }

    req.session.userid = user._id;
    console.log(req.session);
    return res.status(200).send('Logged in successfully');
}

const getLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(400).send('Error logging out');
        }
        return res.status(200).send('Logged out successfully');
    });
}

const getAuthInfo = async (req, res) => {
    console.log("Get auth info end point hit");
    if (req.session.userid) {
        const user = await User.findById(req.session.userid);

        if (!user) {
            return res.status(201).json({
                isLoggedIn: false,
                isAdmin: false,
                message: 'User not found'
            });
        }

        if (user.username !== 'admin') {
            return res.status(201).json({
                isLoggedIn: true,
                isAdmin: false,
                message: "User not authorized"
            })
        }

        return res.status(201).json({
            isLoggedIn: true,
            isAdmin: true,
            message: "User is authorized as admin"
        });
    } else {
        return res.status(201).json({
            message: "User is not logged in",
            isLoggedIn: false,
            isAdmin: false
        });
    }
}

const getImage = (req, res) => {
    const image = req.params.image;
    console.log(image);
    res.sendFile(image, { root: './uploads' });
}

export default {
    postRegister,
    postLogin,
    getLogout,
    getAuthInfo,
    getImage
}
