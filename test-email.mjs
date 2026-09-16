import nodemailer from 'nodemailer';

async function test() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "23bk1a6611@stpetershyd.com",
        pass: "qcco ghvd kwgt gelw",
      },
    });

    const info = await transporter.sendMail({
      from: '"TechTactix 2026" <23bk1a6611@stpetershyd.com>',
      to: "vinaybethala9@gmail.com",
      subject: 'Test Email',
      text: 'This is a test email to verify credentials.',
    });

    console.log("SUCCESS!", info.messageId);
  } catch (e) {
    console.error("FAILED:", e);
  }
}

test();
