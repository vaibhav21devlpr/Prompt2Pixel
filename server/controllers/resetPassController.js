import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const resetPassword = async (req, res) => {
    try {

        const { token } = req.params;
        const { password } = req.body;

        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        const salt = await bcrypt.genSalt(10);

        user.password =
            await bcrypt.hash(password, salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};