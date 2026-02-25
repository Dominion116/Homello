import * as Brevo from '@getbrevo/brevo';

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY!
);

export async function sendOtpEmail(to: string, code: string, purpose: string) {
  const subject =
    purpose === 'signup_verification' ? 'Verify your email' :
    purpose === 'password_reset'      ? 'Reset your password' :
                                        'Your login code';

  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.sender = { email: process.env.FROM_EMAIL!, name: 'Homello' };
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = `<p>Your code is: <strong>${code}</strong>. It expires in 15 minutes.</p>`;
  sendSmtpEmail.textContent = `Your code is: ${code}. It expires in 15 minutes.`;

  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('✅ Email sent:', result.body);
  } catch (err) {
    console.error('❌ Email failed:', err);
    throw err;
  }
}