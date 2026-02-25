import { BrevoClient } from '@getbrevo/brevo';

const client = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY!,
});

export async function sendOtpEmail(to: string, code: string, purpose: string) {
  const subject =
    purpose === 'signup_verification' ? 'Verify your email' :
    purpose === 'password_reset'      ? 'Reset your password' :
                                        'Your login code';

  try {
    const result = await client.transactionalEmails.sendTransacEmail({
      to: [{ email: to }],
      sender: { email: process.env.FROM_EMAIL!, name: 'Homello' },
      subject,
      htmlContent: `<p>Your code is: <strong>${code}</strong>. It expires in 15 minutes.</p>`,
      textContent: `Your code is: ${code}. It expires in 15 minutes.`,
    });
    console.log('✅ Email sent:', result);
  } catch (err) {
    console.error('❌ Email failed:', err);
    throw err;
  }
}