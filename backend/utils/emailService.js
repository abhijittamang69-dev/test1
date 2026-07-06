const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'abhijittamang69@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

exports.sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({ 
            from: '"Konjyosom Tech" <abhijittamang69@gmail.com>', 
            to, 
            subject, 
            html 
        });
        console.log('Email sent to', to);
    } catch (error) {
        console.error('Email failed:', error.message);
    }
};

exports.sendBookingConfirmation = async (to, booking) => {
    const html = `<h2>Booking Confirmed</h2>
        <p>Your service booking #${booking.id} has been received.</p>
        <p>Service: ${booking.serviceType}</p>
        <p>We will contact you shortly.</p>`;
    await this.sendEmail(to, 'Booking Confirmation - Konjyosom Tech', html);
};
