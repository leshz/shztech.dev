"use server";

import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/data/site";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  // z.string().email() is deprecated in Zod 4 in favor of the top-level
  // z.email() string-format schema; see node_modules/zod/v4/classic/schemas.d.ts.
  email: z.email("Enter a valid email address."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be 5000 characters or fewer."),
});

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "message", string[]>
>;

export type ContactActionState =
  | { ok: true; message: string }
  | { ok: false; errors: ContactFieldErrors; message: string };

/**
 * Server Action shaped for React 19's `useActionState`: takes the previous
 * state and the submitted `FormData`, returns the next state.
 *
 * Validates everything server-side with Zod — the client never gets to
 * skip this. A hidden honeypot field ("company") is checked first: real
 * visitors never fill a field they can't see, so any value there is
 * treated as spam and silently reported as success (no information leaked
 * to a bot about why it was rejected).
 */
export async function sendMessage(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { ok: true, message: "Thanks — your message has been sent." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error)
      .fieldErrors as ContactFieldErrors;
    return {
      ok: false,
      errors: fieldErrors,
      message: "Please fix the errors below and try again.",
    };
  }

  const { name, email, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY is not configured — message was not sent.",
    );
    return {
      ok: false,
      errors: {},
      message:
        "Sorry, the contact form isn't configured yet. Please email directly instead.",
    };
  }

  const fromAddress = process.env.CONTACT_FROM_EMAIL;
  if (!fromAddress) {
    console.warn(
      "[contact] CONTACT_FROM_EMAIL is not configured — message was not sent.",
    );
    return {
      ok: false,
      errors: {},
      message:
        "Sorry, the contact form isn't configured yet. Please email directly instead.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: site.email,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend send failed:", error);
      return {
        ok: false,
        errors: {},
        message: "Something went wrong sending your message. Please try again.",
      };
    }

    return { ok: true, message: "Thanks — your message has been sent." };
  } catch (err) {
    console.error("[contact] Unexpected error sending message:", err);
    return {
      ok: false,
      errors: {},
      message: "Something went wrong sending your message. Please try again.",
    };
  }
}
