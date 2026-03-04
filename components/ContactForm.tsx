"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL: FormValues = { name: "", email: "", subject: "", message: "" };

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  function validate(): boolean {
    const e: Partial<FormValues> = {};
    if (!values.name.trim()) e.name = "Name is required.";
    if (!values.email.trim()) {
      e.email = "Email is required.";
    } else if (!validateEmail(values.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!values.subject.trim()) e.subject = "Subject is required.";
    if (!values.message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setFormState("submitting");

    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as URLSearchParams).toString(),
      });
      if (res.ok) {
        setFormState("success");
        setValues(INITIAL);
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className={styles.success} role="alert">
        <p className={styles.successTitle}>Message sent!</p>
        <p>Thank you for reaching out. I&rsquo;ll get back to you within 2 business days.</p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      noValidate
      className={styles.form}
    >
      {/* Netlify hidden field */}
      <input type="hidden" name="form-name" value="contact" />

      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className={styles.errorMsg} role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className={styles.errorMsg} role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="subject" className={styles.label}>
          Subject <span aria-hidden="true">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={(e) =>
            setValues((v) => ({ ...v, subject: e.target.value }))
          }
          className={`${styles.input} ${errors.subject ? styles.inputError : ""}`}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className={styles.errorMsg} role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(e) =>
            setValues((v) => ({ ...v, message: e.target.value }))
          }
          className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ""}`}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className={styles.errorMsg} role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {formState === "error" && (
        <p className={styles.errorMsg} role="alert">
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      <button
        type="submit"
        disabled={formState === "submitting"}
        className={styles.submit}
      >
        {formState === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
