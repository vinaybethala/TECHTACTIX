import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { participant1, participant2 } = data;

    let totalFee = 0;
    if (participant1.membership === "Non-CSI Member") totalFee += 30;
    if (participant2.membership === "Non-CSI Member") totalFee += 30;

    const registrationId = `TTX-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    // Check duplicates
    if (participant1.rollNumber === participant2.rollNumber) {
      return NextResponse.json({ error: "Participants cannot have the same roll number." }, { status: 400 });
    }

    const isDuplicate = await prisma.registration.findFirst({
      where: {
        OR: [
          { participant1RollNumber: participant1.rollNumber },
          { participant2RollNumber: participant1.rollNumber },
          { participant1RollNumber: participant2.rollNumber },
          { participant2RollNumber: participant2.rollNumber }
        ]
      }
    });

    if (isDuplicate) {
      return NextResponse.json({ error: "One or both roll numbers are already registered." }, { status: 400 });
    }

    await prisma.registration.create({
      data: {
        registrationId,
        participant1Name: participant1.name,
        participant1RollNumber: participant1.rollNumber,
        participant1Year: participant1.year,
        participant1Branch: participant1.branch,
        participant1Email: participant1.email,
        participant1Membership: participant1.membership,
        
        participant2Name: participant2.name,
        participant2RollNumber: participant2.rollNumber,
        participant2Year: participant2.year,
        participant2Branch: participant2.branch,
        participant2Email: participant2.email,
        participant2Membership: participant2.membership,
        
        totalFee,
      }
    });

    // 4. Send Email via Nodemailer (Gmail)
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER || "csi.spec@stpetershyd.com",
          pass: process.env.GMAIL_APP_PASSWORD || "haex gyev ocff cclm",
        },
      });

      const info = await transporter.sendMail({
        from: '"TechTactix 2026" <csi.spec@stpetershyd.com>',
        to: `${participant1.email}, ${participant2.email}`,
        subject: 'TechTactix 2026 — Registration Confirmed 🎯',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-w: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
            <h2 style="color: #06b6d4; margin-bottom: 5px;">TECHTACTIX 2026</h2>
            <p style="color: #666; font-style: italic; margin-top: 0;">"Think Smart. Pitch Strong. Defend Better."</p>
            
            <p>Hello Team!</p>
            <p>Your team has successfully registered for the event. Here are your details:</p>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Registration ID:</strong> ${registrationId}</p>
              <p><strong>Date:</strong> 21 September 2026 | <strong>Time:</strong> 10:00 AM</p>
              <p><strong>Venue:</strong> St. Peter's Engineering College, Maisammaguda</p>
            </div>

            <h3>TEAM DETAILS</h3>
            
            <p><strong>Participant 1:</strong> ${participant1.name} (${participant1.rollNumber}) - ${participant1.membership}</p>
            <p><strong>Participant 2:</strong> ${participant2.name} (${participant2.rollNumber}) - ${participant2.membership}</p>
            
            <h3>REGISTRATION FEE</h3>
            <p style="font-size: 18px;"><strong>Total payable at venue: ₹${totalFee}</strong></p>
            
            <p style="font-size: 14px; color: #666;">
              ${totalFee > 0 ? "If you are a Non-CSI member, please pay the applicable ₹30 registration fee at the venue." : "Registration is FREE. CSI members: Please bring your CSI ID card if possible."}
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            
            <h3>JOIN THE WHATSAPP GROUP</h3>
            <p>Please join our official WhatsApp group for important updates and announcements:</p>
            <p>
              <a href="https://chat.whatsapp.com/LOOqWLoBWqg55iakeue6FS?s=cl&p=a&mlu=4&ilr=4" style="display: inline-block; padding: 10px 20px; background-color: #25D366; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Join WhatsApp Group
              </a>
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            
            <p>Prepare your knowledge. Prepare your idea. Prepare to defend it.</p>
            <p>See you at TechTactix 2026.</p>
            
            <p style="color: #888; font-size: 12px; margin-top: 30px;">
              CSI Student Chapter<br>
              St. Peter's Engineering College
            </p>
          </div>
        `
      });

      console.log("==========================================");
      console.log("REAL EMAIL SENT SUCCESSFULLY VIA GMAIL!");
      console.log("Message ID: %s", info.messageId);
      console.log("==========================================");
      
    } catch (emailError) {
      console.error("Email failed to send, but registration succeeded.", emailError);
    }

    return NextResponse.json({ success: true, registrationId });
    
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: `Debug Error: ${error.message || "Unknown error"}` }, { status: 500 });
  }
}
