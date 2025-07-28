"use server";

import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("❌ RESEND_API_KEY is not set in environment variables.");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: "Finance App <onboarding@resend.dev>",
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
