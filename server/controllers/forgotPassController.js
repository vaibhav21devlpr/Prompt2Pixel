import crypto from 'crypto';
import nodemailer from 'nodemailer';
import userModel from '../models/userModel.js';

export const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetUrl =
            `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            html: `
                <h2>Password Reset Request</h2>
                <p>Click below link:</p>
                <a href="${resetUrl}">
                    Reset Password
                </a>
            `
        });

        res.json({
            success: true,
            message: "Reset link sent to email"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};