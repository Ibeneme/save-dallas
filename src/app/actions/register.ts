'use server';

import dbConnect from '@/lib/mongodb';
import Registration from '@/models/Registration';
import { sendEmail } from '@/lib/mailer';
import { revalidatePath } from 'next/cache';

export async function submitRegistration(formData: FormData) {
    try {
        await dbConnect();

        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const address = formData.get('address') as string;
        const phone = formData.get('phone') as string;
        const participation = formData.get('participation') as 'in-person' | 'video';
        const subject = formData.get('subject') as string;

        // 1. Save to MongoDB with email included
        await Registration.create({
            fullName,
            email,
            address,
            phone,
            participation,
            subject,
        });

        // HTML Head boilerplate with font imports for email clients that support web fonts
        const emailHead = `
            <head>
                <meta charset="utf-8">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
                </style>
            </head>
        `;

        // 2. Send Styled Notification to Admin
        await sendEmail({
            to: 'admin@boringthinkers.com',
            subject: `New Speaker Registration: ${fullName}`,
            text: `New registration received:\n\nName: ${fullName}\nEmail: ${email}\nAddress: ${address}\nPhone: ${phone}\nParticipation: ${participation}\nSubject: ${subject}`,
            html: `
                <!DOCTYPE html>
                <html>
                ${emailHead}
                <body style="margin: 0; padding: 0; background-color: #F7F8FA; font-family: 'Public Sans', system-ui, sans-serif;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F7F8FA; padding: 40px 0;">
                        <tr>
                            <td align="center">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(3, 28, 75, 0.1);">
                                    <tr><td style="height: 4px; background: linear-gradient(90deg, #0F6DF9, #094EA1, transparent);"></td></tr>
                                    <tr>
                                        <td style="padding: 36px 40px 24px 40px;">
                                            <span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.28em; color: #0F6DF9;">01 — Speaker Portal</span>
                                            <h2 style="font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 24px; font-weight: 700; color: #031C4B; margin: 12px 0 0 0;">New Registration Received</h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 0 40px 36px 40px;">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; border: 1px solid rgba(3, 28, 75, 0.08); border-radius: 12px; padding: 24px;">
                                                <tr><td style="padding-bottom: 16px; border-bottom: 1px solid rgba(3, 28, 75, 0.08);">
                                                    <span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(3, 28, 75, 0.5); display: block; margin-bottom: 6px;">Full Name</span>
                                                    <span style="font-size: 16px; font-weight: 600; color: #031C4B;">${fullName}</span>
                                                </td></tr>
                                                <tr><td style="padding: 16px 0; border-bottom: 1px solid rgba(3, 28, 75, 0.08);">
                                                    <span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(3, 28, 75, 0.5); display: block; margin-bottom: 6px;">Email Address</span>
                                                    <span style="font-size: 15px; font-weight: 500; color: #0F6DF9;">${email}</span>
                                                </td></tr>
                                                <tr><td style="padding: 16px 0; border-bottom: 1px solid rgba(3, 28, 75, 0.08);">
                                                    <span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(3, 28, 75, 0.5); display: block; margin-bottom: 6px;">Residence Address</span>
                                                    <span style="font-size: 15px; color: rgba(3, 28, 75, 0.85);">${address}</span>
                                                </td></tr>
                                                <tr><td style="padding: 16px 0; border-bottom: 1px solid rgba(3, 28, 75, 0.08);">
                                                    <span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(3, 28, 75, 0.5); display: block; margin-bottom: 6px;">Daytime Telephone</span>
                                                    <span style="font-size: 15px; color: rgba(3, 28, 75, 0.85);">${phone}</span>
                                                </td></tr>
                                                <tr><td style="padding: 16px 0; border-bottom: 1px solid rgba(3, 28, 75, 0.08);">
                                                    <span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(3, 28, 75, 0.5); display: block; margin-bottom: 6px;">Choice of Participation</span>
                                                    <span style="display: inline-block; background-color: rgba(15, 109, 249, 0.1); color: #0F6DF9; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase;">${participation}</span>
                                                </td></tr>
                                                <tr><td style="padding-top: 16px;">
                                                    <span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(3, 28, 75, 0.5); display: block; margin-bottom: 8px;">Subject Matter</span>
                                                    <div style="font-size: 14px; line-height: 1.6; color: rgba(3, 28, 75, 0.85); margin: 0; background: #ffffff; border: 1px solid rgba(3, 28, 75, 0.08); padding: 12px; border-radius: 8px;">${subject}</div>
                                                </td></tr>
                                            </table>
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

        // 3. Send User Confirmation Email
        await sendEmail({
            to: email,
            subject: `Registration Confirmed: City Council Meeting`,
            text: `Hi ${fullName},\n\nWe have received your registration to speak at the upcoming City Council meeting on September 2. We will follow up with confirmation details ahead of the meeting.\n\nThank you for making your voice heard!`,
            html: `
                <!DOCTYPE html>
                <html>
                ${emailHead}
                <body style="margin: 0; padding: 0; background-color: #F7F8FA; font-family: 'Public Sans', system-ui, sans-serif;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F7F8FA; padding: 40px 0;">
                        <tr>
                            <td align="center">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(3, 28, 75, 0.1);">
                                    <tr><td style="height: 4px; background: linear-gradient(90deg, #0F6DF9, #094EA1, transparent);"></td></tr>
                                    <tr>
                                        <td style="padding: 36px 40px 24px 40px;">
                                            <span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.28em; color: #031C4B;">Speaker Confirmation</span>
                                            <h2 style="font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 24px; font-weight: 700; color: #031C4B; margin: 12px 0 0 0;">You're Registered to Speak</h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 0 40px 36px 40px;">
                                            <p style="font-size: 15px; line-height: 1.6; color: rgba(3, 28, 75, 0.7); margin: 0 0 24px 0;">
                                                Hi <strong style="color: #031C4B;">${fullName}</strong>, thank you for signing up to address the City Council. We have successfully logged your registration details.
                                            </p>
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; border: 1px solid rgba(3, 28, 75, 0.08); border-radius: 12px; padding: 20px;">
                                                <tr><td style="padding-bottom: 12px; border-bottom: 1px solid rgba(3, 28, 75, 0.08);">
                                                    <span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(3, 28, 75, 0.5);">Participation Type</span><br>
                                                    <span style="font-size: 14px; font-weight: 600; color: #0F6DF9; text-transform: uppercase; display: inline-block; margin-top: 6px;">${participation}</span>
                                                </td></tr>
                                                <tr><td style="padding-top: 12px;">
                                                    <span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(3, 28, 75, 0.5);">Subject Matter</span><br>
                                                    <span style="font-size: 14px; color: rgba(3, 28, 75, 0.85); display: inline-block; margin-top: 6px;">${subject}</span>
                                                </td></tr>
                                            </table>
                                            <p style="font-size: 13px; line-height: 1.6; color: rgba(3, 28, 75, 0.5); margin: 24px 0 0 0;">
                                                We'll follow up with meeting details and instructions ahead of September 2. Thank you for making your voice heard.
                                            </p>
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

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Registration/Mailer error:', error);
        return { success: false, error: 'Failed to complete registration.' };
    }
}