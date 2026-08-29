'use server';

import dbConnect from '@/lib/mongodb';
import Registration from '@/models/Registration';
import { sendEmail } from '@/lib/mailer';
import { revalidatePath } from 'next/cache';

export async function getRegistrationsData() {
    await dbConnect();

    const registrations = await Registration.find({}).sort({ createdAt: -1 }).lean();

    const total = registrations.length;
    const inPersonCount = registrations.filter(r => r.participation === 'in-person').length;
    const videoCount = registrations.filter(r => r.participation === 'video').length;

    // Convert MongoDB documents to plain JSON objects for Client Components
    const serialized = registrations.map(reg => ({
        _id: reg._id.toString(),
        fullName: reg.fullName,
        email: reg.email,
        address: reg.address,
        phone: reg.phone,
        participation: reg.participation,
        subject: reg.subject,
        createdAt: reg.createdAt ? new Date(reg.createdAt).toISOString() : null,
    }));

    return {
        registrations: serialized,
        stats: { total, inPersonCount, videoCount },
    };
    
}

export async function sendBroadcastEmail(formData: FormData) {
    try {
        await dbConnect();

        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        // Fetch all records
        const allRegistrations = await Registration.find({}, 'email fullName').lean();

        // FILTER: Only keep records that actually have an email address
        const validRegistrations = allRegistrations.filter(
            reg => reg.email && reg.email.trim() !== ''
        );

        if (!validRegistrations.length) {
            return { success: false, error: 'No registered speakers with valid emails found to email.' };
        }

        // Loop and send emails using the FILTERED list
        await Promise.all(
            validRegistrations.map(reg =>
                sendEmail({
                    to: reg.email,
                    subject: subject,
                    text: `Hi ${reg.fullName},\n\n${message}`,
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
                                                    <span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.28em; color: #0F6DF9;">City Council Update</span>
                                                    <h2 style="font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 24px; font-weight: 700; color: #031C4B; margin: 12px 0 0 0;">${subject}</h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 40px 36px 40px;">
                                                    <p style="font-size: 15px; line-height: 1.6; color: rgba(3, 28, 75, 0.7); margin: 0 0 20px 0;">
                                                        Hi <strong style="color: #031C4B;">${reg.fullName}</strong>,
                                                    </p>
                                                    <div style="font-size: 14px; line-height: 1.7; color: rgba(3, 28, 75, 0.85); background: #F8FAFC; padding: 20px; border-radius: 10px; border: 1px solid rgba(3, 28, 75, 0.08);">
                                                        ${message.replace(/\n/g, '<br>')}
                                                    </div>
                                                    <p style="font-size: 12px; color: rgba(3, 28, 75, 0.4); margin-top: 24px;">
                                                        Boring Thinkers Municipal Portal &bull; Automated Dispatch
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
                })
            )
        );

        revalidatePath('/admin/registrations');
        return { success: true, count: validRegistrations.length };
    } catch (error) {
        console.error('Broadcast email error:', error);
        return { success: false, error: 'Failed to send broadcast emails.' };
    }
}