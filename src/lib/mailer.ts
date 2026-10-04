import nodemailer from "nodemailer";
import { calculateMetrics, generateReportHtml } from "./report-generator";

export interface SendReportResult {
  success: boolean;
  messageId?: string;
  previewUrl?: string;
  recipient: string;
  mode: "real_smtp" | "test_ethereal";
  error?: string;
}

export async function sendWeeklyReport(
  targetRecipient: string = process.env.REPORT_RECIPIENT || "soficontrerash@gmail.com"
): Promise<SendReportResult> {
  const metrics = await calculateMetrics(7);
  const htmlContent = generateReportHtml(metrics);
  const subject = `🌿 Reporte Semanal Florería Memorial — ${metrics.periodStart} al ${metrics.periodEnd}`;

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com";
  const emailPort = Number(process.env.EMAIL_PORT) || 465;

  // Case 1: Real SMTP configured via environment variables
  if (emailUser && emailPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: emailPort === 465,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"Florería Memorial Analíticas" <${emailUser}>`,
        to: targetRecipient,
        subject,
        html: htmlContent,
      });

      return {
        success: true,
        messageId: info.messageId,
        recipient: targetRecipient,
        mode: "real_smtp",
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("Error sending real SMTP email:", errorMsg);
      return {
        success: false,
        recipient: targetRecipient,
        mode: "real_smtp",
        error: errorMsg,
      };
    }
  }

  // Case 2: No SMTP credentials yet -> use Ethereal for safe test sandbox
  try {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"Florería Memorial Analíticas" <reportes@floreriapilar.com.ar>',
      to: targetRecipient,
      subject,
      html: htmlContent,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;

    return {
      success: true,
      messageId: info.messageId,
      previewUrl,
      recipient: targetRecipient,
      mode: "test_ethereal",
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      recipient: targetRecipient,
      mode: "test_ethereal",
      error: errorMsg,
    };
  }
}
