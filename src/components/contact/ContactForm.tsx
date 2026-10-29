"use client";

import { useRef, useState } from "react";
import { Check, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { siteConfig } from "@/data/site";
import { buttonStyles } from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

type FormStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface aria-[invalid=true]:border-red-500";

interface ContactFormProps {
  endpoint?: string;
}

export function ContactForm({ endpoint = "" }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  const isSubmitting = status.state === "submitting";

  function focusField(name: FieldName) {
    formRef.current
      ?.querySelector<HTMLElement>(`[name="${name}"]`)
      ?.focus();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();

    // Simple honeypot: real visitors never see or fill this field.
    if (website) {
      return;
    }

    const nextErrors: FieldErrors = {};
    if (name.length < 2) {
      nextErrors.name = "Please enter your name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (message.length < 10) {
      nextErrors.message = "Please write at least 10 characters.";
    }

    setErrors(nextErrors);

    const firstInvalid = (["name", "email", "message"] as const).find(
      (field) => nextErrors[field],
    );

    if (firstInvalid) {
      setStatus({ state: "idle" });
      focusField(firstInvalid);
      return;
    }

    setStatus({ state: "submitting" });

    try {
      const targetEndpoint = endpoint || "/api/contact";
      const response = await fetch(targetEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio message from ${name}`,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMsg =
          payload.error ||
          payload.errors?.[0]?.message ||
          `Service responded with status ${response.status}.`;
        throw new Error(errorMsg);
      }

      if (payload.configured === false && payload.mailtoUrl) {
        window.location.href = payload.mailtoUrl;
      }

      form.reset();
      setStatus({ state: "success" });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error && error.message
            ? error.message
            : "Something went wrong while sending the message.",
      });
    }
  }

  // Success view matching the requested reaction UI
  if (status.state === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center py-8 text-center sm:py-10"
      >
        <div className="grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          <Check aria-hidden="true" className="size-8 stroke-[2.5]" />
        </div>

        <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Message Sent!
        </h3>

        <p className="mt-2.5 max-w-sm text-pretty text-sm leading-relaxed text-muted sm:text-base">
          Thank you for reaching out. I have received your note and will get back
          to you shortly.
        </p>

        <button
          type="button"
          onClick={() => {
            setErrors({});
            setStatus({ state: "idle" });
          }}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-6 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="mt-6 flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold text-foreground"
          >
            Name <span className="text-muted">(required)</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn(fieldClass, "mt-1.5")}
            placeholder="Your name"
          />
          {errors.name ? (
            <p
              id="contact-name-error"
              className="mt-1.5 text-[11px] font-medium text-red-600 dark:text-red-400"
            >
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="min-w-0">
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold text-foreground"
          >
            Email <span className="text-muted">(required)</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn(fieldClass, "mt-1.5")}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p
              id="contact-email-error"
              className="mt-1.5 text-[11px] font-medium text-red-600 dark:text-red-400"
            >
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="min-w-0">
        <label
          htmlFor="contact-message"
          className="block text-xs font-semibold text-foreground"
        >
          Message <span className="text-muted">(required)</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : "contact-message-hint"
          }
          className={cn(fieldClass, "mt-1.5 resize-y")}
          placeholder="Tell me a little about the role, project, or question."
        />
        {errors.message ? (
          <p
            id="contact-message-error"
            className="mt-1.5 text-[11px] font-medium text-red-600 dark:text-red-400"
          >
            {errors.message}
          </p>
        ) : (
          <p id="contact-message-hint" className="mt-1.5 text-[11px] text-muted">
            At least 10 characters.
          </p>
        )}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonStyles("primary", "md")}
        >
          {isSubmitting ? (
            <LoaderCircle
              aria-hidden="true"
              className="size-4 motion-safe:animate-spin"
            />
          ) : (
            <Send aria-hidden="true" className="size-4" />
          )}
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
        <p className="text-[11px] leading-5 text-muted">
          Your message goes directly to my email. I never share your details.
        </p>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {status.state === "error" ? (
          <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-3.5 py-3 text-xs leading-5 text-muted">
            <TriangleAlert
              aria-hidden="true"
              className="mt-0.5 size-3.5 shrink-0 text-red-600 dark:text-red-400"
            />
            <span>
              {status.message} You can{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-foreground underline decoration-accent/50 underline-offset-2"
              >
                email me directly
              </a>{" "}
              instead.
            </span>
          </div>
        ) : null}
      </div>
    </form>
  );
}