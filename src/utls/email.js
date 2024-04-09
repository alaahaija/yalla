import nodemailer from 'nodemailer';

export async function sendEmail(to,subject,html) {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: process.env.EMAILSENDER,
          pass: process.env.PASSSENDEMAIL,
        },
      });
      const info = await transporter.sendMail({
        from: `"YALLA DELIVERY👻" <${process.env.EMAILSENDER}>`, 
        to, 
        subject, 
        html, 
      });
      return info;
};

