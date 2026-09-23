const nodemailer = require('nodemailer');

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'khushitanna310@gmail.com';

/**
 * Configure and get a Nodemailer transporter
 */
const getTransporter = async () => {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (user && pass) {
    // Real production SMTP (e.g., Gmail with App Password or custom SMTP)
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE === 'false' ? false : port === 465;

    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }

  // Fallback to simulated test account if credentials are not yet configured in .env
  try {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      isTestAccount: true,
    });
  } catch (err) {
    console.warn('[Email Service] Could not create Ethereal test account:', err.message);
    return null;
  }
};

/**
 * Send an email notification when a user books a demo call
 * @param {Object} booking
 */
const sendCallBookingNotification = async (booking) => {
  const {
    clientName,
    clientEmail,
    clientPhone,
    appointmentDate,
    appointmentTime,
    company = 'Not specified',
    serviceType = 'AI Receptionist Demo Call',
    industry = 'General Business',
    notes = 'None provided',
    bookedVia = 'Website Demo Call Form',
  } = booking;

  const subject = `🚨 New Demo Call Booked: ${clientName} (${appointmentDate} at ${appointmentTime})`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fb; margin: 0; padding: 24px; color: #1e293b; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #0b1120 0%, #1e3a8a 100%); color: #ffffff; padding: 28px 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0 0; font-size: 13px; color: #93c5fd; }
        .content { padding: 28px 24px; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; background-color: #dbeafe; color: #1e40af; margin-bottom: 16px; }
        .info-table { width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 24px; }
        .info-table tr { border-bottom: 1px solid #f1f5f9; }
        .info-table td { padding: 12px 6px; font-size: 14px; vertical-align: top; }
        .info-table td.label { font-weight: 600; color: #64748b; width: 38%; }
        .info-table td.value { font-weight: 700; color: #0f172a; }
        .notes-box { background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 14px; border-radius: 8px; margin-top: 16px; margin-bottom: 24px; font-size: 14px; color: #334155; line-height: 1.5; }
        .cta-container { display: flex; gap: 12px; margin-top: 20px; }
        .btn-call { display: inline-block; background-color: #2563eb; color: #ffffff !important; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; text-align: center; }
        .btn-mail { display: inline-block; background-color: #f1f5f9; color: #1e293b !important; border: 1px solid #cbd5e1; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; text-align: center; }
        .footer { background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>📞 New Demo Call Booking</h1>
          <p>Vedanco AI Receptionist Lead Notification</p>
        </div>
        <div class="content">
          <div class="badge">Immediate Action Required</div>
          <p style="margin-top:0; font-size: 14px; color: #475569;">
            A user has booked a demo call on your website. Here are their complete contact and schedule details:
          </p>

          <table class="info-table">
            <tr>
              <td class="label">👤 Client Name:</td>
              <td class="value">${clientName}</td>
            </tr>
            <tr>
              <td class="label">📱 Mobile / Phone:</td>
              <td class="value"><a href="tel:${clientPhone}" style="color: #2563eb; text-decoration: none;">${clientPhone}</a></td>
            </tr>
            <tr>
              <td class="label">✉️ Email Address:</td>
              <td class="value"><a href="mailto:${clientEmail}" style="color: #2563eb; text-decoration: none;">${clientEmail}</a></td>
            </tr>
            <tr>
              <td class="label">📅 Preferred Date:</td>
              <td class="value" style="color: #059669;">${appointmentDate}</td>
            </tr>
            <tr>
              <td class="label">⏰ Preferred Time:</td>
              <td class="value" style="color: #059669;">${appointmentTime}</td>
            </tr>
            <tr>
              <td class="label">🏢 Company Name:</td>
              <td class="value">${company}</td>
            </tr>
            <tr>
              <td class="label">🏷️ Industry:</td>
              <td class="value">${industry || serviceType}</td>
            </tr>
            <tr>
              <td class="label">🌐 Booked Via:</td>
              <td class="value">${bookedVia}</td>
            </tr>
          </table>

          <div style="font-weight: 600; font-size: 13px; color: #64748b; text-transform: uppercase;">
            💬 Specific Requirements / Problem To Solve:
          </div>
          <div class="notes-box">
            ${notes ? notes.replace(/\n/g, '<br/>') : 'No additional notes provided.'}
          </div>

          <div class="cta-container">
            <a href="tel:${clientPhone}" class="btn-call">📞 Call Client Now</a>
            &nbsp;
            <a href="mailto:${clientEmail}?subject=Regarding%20Your%20Vedanco%20AI%20Demo%20Call" class="btn-mail">✉️ Reply via Email</a>
          </div>
        </div>

        <div class="footer">
          This automated lead notification was generated by Vedanco AI Platform for <strong>${NOTIFICATION_EMAIL}</strong>.
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
=========================================
  NEW DEMO CALL BOOKED - VEDANCO AI
=========================================
Client Name:    ${clientName}
Mobile/Phone:   ${clientPhone}
Email:          ${clientEmail}
Preferred Date: ${appointmentDate}
Preferred Time: ${appointmentTime}
Company:        ${company}
Industry:       ${industry || serviceType}
Requirements:   ${notes}
Booked Via:     ${bookedVia}
Target Inbox:   ${NOTIFICATION_EMAIL}
=========================================
  `;

  // Always log to backend console
  console.log(`\n============================================================`);
  console.log(`🔔 [NOTIFICATION EMAIL TO: ${NOTIFICATION_EMAIL}]`);
  console.log(`   Client:         ${clientName}`);
  console.log(`   Phone:          ${clientPhone}`);
  console.log(`   Email:          ${clientEmail}`);
  console.log(`   Date & Time:    ${appointmentDate} at ${appointmentTime}`);
  console.log(`   Company:        ${company} (${industry})`);
  console.log(`   Requirements:   ${notes}`);
  console.log(`============================================================\n`);

  try {
    const transporter = await getTransporter();

    if (!transporter) {
      console.warn(`[Email Service] Transporter not available. Booking recorded in database.`);
      return { success: false, reason: 'Transporter not configured' };
    }

    const senderEmail = process.env.SMTP_USER || 'notifications@vedanco-ai.com';

    const info = await transporter.sendMail({
      from: `"Vedanco AI Notifications" <${senderEmail}>`,
      to: NOTIFICATION_EMAIL,
      replyTo: clientEmail,
      subject: subject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Email Service] Email sent successfully to ${NOTIFICATION_EMAIL}. MessageId: ${info.messageId}`);

    // If using Ethereal test account, print preview link
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`🔗 [Email Service Preview URL]: ${previewUrl}`);
    }

    // Also send an optional confirmation email to the client if real SMTP is used
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await transporter.sendMail({
          from: `"Vedanco AI Team" <${senderEmail}>`,
          to: clientEmail,
          subject: `Your Vedanco AI Demo Call is Confirmed for ${appointmentDate}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
              <h2>Hi ${clientName},</h2>
              <p>Thank you for booking a demo call with Vedanco AI!</p>
              <p>We have reserved your slot for <strong>${appointmentDate}</strong> at <strong>${appointmentTime}</strong>.</p>
              <p>Our team will call you on <strong>${clientPhone}</strong> to walk you through how our 24/7 AI Receptionist can automate your phone calls and book clients directly.</p>
              <br/>
              <p>Best regards,<br/><strong>The Vedanco AI Team</strong></p>
            </div>
          `,
        });
        console.log(`[Email Service] Confirmation email sent to client: ${clientEmail}`);
      } catch (clientErr) {
        console.warn(`[Email Service] Could not send confirmation to client:`, clientErr.message);
      }
    }

    return { success: true, messageId: info.messageId, previewUrl };
  } catch (error) {
    console.error(`[Email Service] Error sending email notification:`, error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendCallBookingNotification,
  NOTIFICATION_EMAIL,
};
