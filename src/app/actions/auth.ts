'use server';

import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { sendEmail } from '@/lib/mailer';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

const ALLOWED_ADMINS = ['contact@boringthinkers.com', 'ikennaibenemee@gmail.com'];

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session"); // or whatever your session cookie is named
    redirect("/admin/login"); // or your login route
}

export async function requestOtp(formData: FormData) {
    try {
        await dbConnect();

        const email = (formData.get('email') as string)?.toLowerCase().trim();

        if (!ALLOWED_ADMINS.includes(email)) {
            return { success: false, error: 'Access denied. Unauthorized email address.' };
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes

        // Find or create the admin in the database
        await Admin.findOneAndUpdate(
            { email },
            { otp, otpExpires },
            { upsert: true, new: true }
        );

        // Send OTP email
        await sendEmail({
            to: email,
            subject: 'Admin Portal Login OTP',
            text: `Your admin verification code is: ${otp}. It expires in 10 minutes.`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
                    </style>
                </head>
                <body style="margin: 0; padding: 0; background-color: #F7F8FA; font-family: 'Public Sans', system-ui, sans-serif;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F7F8FA; padding: 40px 0;">
                        <tr>
                            <td align="center">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(3, 28, 75, 0.1);">
                                    <tr><td style="height: 4px; background: linear-gradient(90deg, #0F6DF9, #094EA1, transparent);"></td></tr>
                                    <tr>
                                        <td style="padding: 36px 40px 24px 40px;">
                                            <span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.28em; color: #0F6DF9;">Admin Security</span>
                                            <h2 style="font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 24px; font-weight: 700; color: #031C4B; margin: 12px 0 0 0;">Authentication Code</h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 0 40px 36px 40px;">
                                            <p style="font-size: 15px; line-height: 1.6; color: rgba(3, 28, 75, 0.7); margin: 0 0 24px 0;">
                                                Please use the following 6-digit code to complete your login. This code is valid for 10 minutes.
                                            </p>
                                            <div style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 32px; font-weight: 700; letter-spacing: 0.3em; color: #031C4B; background: #F8FAFC; padding: 24px; text-align: center; border-radius: 12px; border: 1px solid rgba(3, 28, 75, 0.08);">
                                                ${otp}
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        });

        return { success: true, email };
    } catch (error) {
        console.error('Request OTP error:', error);
        return { success: false, error: 'Failed to send OTP. Please try again.' };
    }
}

export async function verifyOtp(formData: FormData) {
    try {
        await dbConnect();

        const email = (formData.get('email') as string)?.toLowerCase().trim();
        const otp = (formData.get('otp') as string)?.trim();

        const admin = await Admin.findOne({ email });

        if (!admin || admin.otp !== otp || !admin.otpExpires || admin.otpExpires < new Date()) {
            return { success: false, error: 'Invalid or expired verification code.' };
        }

        // Clear OTP after successful use
        admin.otp = undefined;
        admin.otpExpires = undefined;
        await admin.save();

        // Set access token cookie (secure HttpOnly token)
        const cookieStore = await cookies();
        cookieStore.set('admin_session', email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return { success: true };
    } catch (error) {
        console.error('Verify OTP error:', error);
        return { success: false, error: 'Verification failed.' };
    }
}