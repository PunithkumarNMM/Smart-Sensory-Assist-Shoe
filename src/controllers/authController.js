const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

// ================= LOGIN =================

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ================= REGISTER =================

const register = async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "Registration Successful",
            user
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ================= FORGOT PASSWORD =================

const forgotPassword = async (req, res) => {

    try {

        const { email, newPassword } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password Updated Successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const updateProfile = async (req, res) => {

    try {

        const { name, email } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();

        res.json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const uploadProfileImage = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded"
            });
        }

        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64Image, {
            folder: "smartshoe/profile-images"
        });

        const user = await User.findById(req.user.id);

        user.profileImage = result.secure_url;

        await user.save();

        res.json({
            success: true,
            message: "Profile image uploaded successfully",
            imageUrl: result.secure_url
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const changePassword = async (req, res) => {

    try {

        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const match = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    register,
    login,
    forgotPassword,
    getProfile,
    updateProfile,
    changePassword,
    uploadProfileImage
};