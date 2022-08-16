const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD
    }
});

const sendEmail = async (data) => {
    const mailOptions = {
        from: 'Nodejs app',
        to: process.env.ADMIN_EMAIL,
        subject: 'Nuevo registro de usuario',
        html: `
            <h1>Nuevo registro de usuario</h1>
            <div class="register-mail">
                <p>Nombre: ${data.name}</p>
                <p>Edad: ${data.age}</p>
                <p>Dirección: ${data.address}</p>
                <p>Teléfono: ${data.phone}</p>
                <p>Email: ${data.email}</p>
            </div>
        `
    };

    await transport.sendMail(mailOptions);
};

module.exports = {
    sendEmail
}
