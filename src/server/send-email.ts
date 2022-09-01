import { SendEmailInput } from "@client/utils/types";
import sgMail from "@sendgrid/mail";

const FROM_EMAIL = process.env.SEND_FROM_EMAIL;
const SENDGRID_KEY = process.env.SENDGRID_API_KEY || "fake";
sgMail.setApiKey(SENDGRID_KEY);

/**
 * Send an email with Sendgrid
 *
 * @example
 * ```ts
 * sgMail({
 *   to: user.email,
 *   subject: `Welcome to ${appName}!`,
 *   text: `We're happy to have you...`
 * })
 * ```
 */
export const sendEmail = (input: SendEmailInput) => {
  if (SENDGRID_KEY == "fake" || !FROM_EMAIL) {
    console.error(`Please specify SENDGRID env variables.`);
    return;
  }

  const message = {
    to: input.to,
    from: FROM_EMAIL,
    subject: input.subject,
    text: input.text,
  };

  return sgMail.send(message).catch(console.log);
};
