import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_APP_PASSWORD,
    },
});

interface SendEmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export async function sendEmail({ to, subject, text, html }: SendEmailOptions) {
    try {
        const info = await transporter.sendMail({
            from: `"SAVE DALLAS" <${process.env.ZOHO_EMAIL}>`,
            to,
            subject,
            text,
            html,
        });

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email via Zoho:', error);
        return { success: false, error };
    }
}