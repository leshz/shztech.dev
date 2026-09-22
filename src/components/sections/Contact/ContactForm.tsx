"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { sendMessage } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button/Button";
import styles from "./ContactForm.module.css";

const initialState = {
  ok: false as const,
  errors: {},
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="fill" disabled={pending} aria-busy={pending}>
      {pending ? "Sending…" : "Send message"}
    </Button>
  );
}

/**
 * Real, working contact form (React 19 `useActionState` + `useFormStatus`).
 * Renders a genuine `<form action={formAction}>`, so it degrades to a plain
 * HTML form POST if JS fails to load — progressive enhancement, not a
 * client-only widget.
 *
 * The `company` field is a honeypot: hidden from sighted users via CSS and
 * removed from the tab order / AT tree, but present in the DOM for bots
 * that fill every field blindly. Checked server-side in `sendMessage`.
 */
export function ContactForm() {
  const [state, formAction] = useActionState(sendMessage, initialState);
  const formId = useId();
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const messageId = `${formId}-message`;
  const nameErrorId = `${formId}-name-error`;
  const emailErrorId = `${formId}-email-error`;
  const messageErrorId = `${formId}-message-error`;
  const statusId = `${formId}-status`;

  const errors = state.ok ? {} : state.errors;
  const nameError = errors.name?.[0];
  const emailError = errors.email?.[0];
  const messageError = errors.message?.[0];

  return (
    <form action={formAction} className={styles.form} noValidate>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={nameId} className={styles.label}>
          Name
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          className={styles.input}
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? nameErrorId : undefined}
        />
        {nameError ? (
          <p id={nameErrorId} className={styles.error}>
            {nameError}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor={emailId} className={styles.label}>
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="email"
          className={styles.input}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? emailErrorId : undefined}
        />
        {emailError ? (
          <p id={emailErrorId} className={styles.error}>
            {emailError}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor={messageId} className={styles.label}>
          Message
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className={styles.textarea}
          aria-invalid={messageError ? true : undefined}
          aria-describedby={messageError ? messageErrorId : undefined}
        />
        {messageError ? (
          <p id={messageErrorId} className={styles.error}>
            {messageError}
          </p>
        ) : null}
      </div>

      <SubmitButton />

      <output id={statusId} className={styles.status} aria-live="polite">
        {state.message}
      </output>
    </form>
  );
}
