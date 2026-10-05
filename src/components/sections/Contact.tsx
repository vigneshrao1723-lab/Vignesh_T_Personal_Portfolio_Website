import { useState } from "react";
import type { FormEvent } from "react";
import { Button, Container, Heading, Section, SectionLabel, Text } from "../ui";
import { useScrollReveal } from "../../animation/useScrollReveal";

const EMAIL = "vigneshrao1723@gmail.com";
const PHONE_HREF = "tel:+916363165765";

// Both URLs are read directly from the hyperlinks embedded in the current
// resume PDF (Downloads/Vignesh_T_Resume.pdf) — the visible text there is
// just "GitHub | LinkedIn", the targets live in the link annotations. The
// GitHub account is independently confirmed by the git remotes of the
// quantum and RAG repos (both under vigneshrao1723-lab) and returns HTTP 200.
// LinkedIn blocks automated checks, so its URL is trusted from the resume.
const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "GitHub", href: "https://github.com/vigneshrao1723-lab" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vignesh-t-33651b397/" },
];

const ITEM_COUNT = 3;
const MESSAGE_LIMIT = 1500;

const fieldClass =
  "mt-2 block w-full rounded-control border border-border bg-surface px-4 py-3 text-body-sm text-ink placeholder:text-ink-muted transition-colors duration-[var(--duration-fast)] ease-out hover:border-border-strong focus:border-accent";
const labelClass = "block text-body-sm font-medium text-ink";

/**
 * There is no backend or email service behind this site (and none is
 * configured), so the form cannot — and does not pretend to — deliver a
 * message. Submitting composes a `mailto:` message from the fields and hands
 * it to the visitor's own email app; nothing leaves the browser until they
 * press send there. The note shown afterwards says exactly that, never
 * "message sent". If a real endpoint is added later, replace `handleSubmit`
 * and the note together.
 */
function ContactForm() {
  const [opened, setOpened] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const lines = [message, "", `Name: ${name}`, `Email: ${email}`];
    if (phone) lines.push(`Phone: ${phone}`);
    const body = lines.join("\r\n");
    const subject = `Portfolio inquiry from ${name}`;

    // A throwaway anchor click is the most reliable way to hand a mailto: URL to
    // the OS mail handler without navigating (or unloading) this page.
    const link = document.createElement("a");
    link.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setOpened(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-heading"
      className="rounded-card border border-border bg-surface p-6 shadow-card md:p-8"
    >
      <h3 id="contact-form-heading" className="font-display text-heading-md font-medium text-ink">
        Send a message
      </h3>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            className={fieldClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={160}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className={labelClass}>
              Phone <span className="font-normal text-ink-muted">(optional)</span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            Message or project inquiry
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            maxLength={MESSAGE_LIMIT}
            className={`${fieldClass} resize-y`}
          />
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" variant="primary">
          Contact me
        </Button>
      </div>

      <p className="mt-4 text-caption text-ink-muted">
        This opens your email app with the message filled in. Nothing is sent until you
        press send there.
      </p>
      {opened && (
        <p role="status" className="mt-3 text-body-sm text-ink-secondary">
          If your email app didn&rsquo;t open, write to me directly at{" "}
          <a className="text-accent underline underline-offset-4" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  );
}

/**
 * Contact (spec §8 Phase 4D, reworked 2026-10-05). Left: a short invitation
 * and the direct channels (email, phone, location, profiles) — these work
 * with no JavaScript. Right: the inquiry form (see `ContactForm`).
 */
export function Contact() {
  const { containerRef, getItemRef } = useScrollReveal<HTMLDivElement>(ITEM_COUNT);

  return (
    <Section id="contact" aria-labelledby="contact-heading">
      <Container ref={containerRef}>
        <div ref={getItemRef(0)}>
          <SectionLabel index="06">Contact</SectionLabel>
          <Heading id="contact-heading" as="h2" size="display-lg" className="mt-6 max-w-3xl">
            Contact me.
          </Heading>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div ref={getItemRef(1)}>
            <Text as="p" tone="secondary" size="body-lg" className="max-w-md">
              If you&rsquo;d like to talk about a project, a collaboration, technical
              work, or an opportunity, send me a message.
            </Text>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={`mailto:${EMAIL}`} variant="secondary">
                Email me
              </Button>
              <Button href={PHONE_HREF} variant="secondary">
                Call
              </Button>
            </div>

            <Text as="p" tone="muted" size="caption" className="mt-8">
              Bengaluru, Karnataka
            </Text>

            <div className="mt-4 flex flex-wrap gap-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm text-ink-secondary transition-colors duration-[var(--duration-fast)] ease-out hover:text-accent"
                >
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>

          <div ref={getItemRef(2)}>
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
