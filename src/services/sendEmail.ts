import {ServerClient} from 'postmark';

// Initialize Postmark client with your API key
const postmarkClient = new ServerClient('31ed61ff-2407-4b06-84e7-09a368f16a98');

export const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html: string,
) => {
    try {
        const response = await postmarkClient.sendEmail({
            From: 'fabdulrazak@deloitte.com',
            To: to, // The recipient's email address
            Subject: subject,
            TextBody: text,
            HtmlBody: html,
        });

        console.log('Email sent successfully!', response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
