import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, website } = body || {};

    // Honeypot check
    if (website) {
      return NextResponse.json({ success: true, message: "Message sent." });
    }

    // Validation
    const trimmedName = String(name || "").trim();
    const trimmedEmail = String(email || "").trim();
    const trimmedMessage = String(message || "").trim();

    if (trimmedName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your name (at least 2 characters)." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (trimmedMessage.length < 10) {
      return NextResponse.json(
        { error: "Please write at least 10 characters." },
        { status: 400 },
      );
    }

    const formspreeEndpoint =
      process.env.FORMSPREE_ENDPOINT ||
      process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    const resendApiKey = process.env.RESEND_API_KEY;

    // 1. If Formspree endpoint is configured
    if (formspreeEndpoint) {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          _subject: `Portfolio message from ${trimmedName} (${trimmedEmail})`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg =
          errorData?.errors?.[0]?.message ||
          `Service responded with status ${response.status}`;
        return NextResponse.json({ error: errorMsg }, { status: 502 });
      }

      return NextResponse.json({
        success: true,
        message: "Your message has been delivered to Md. Rezanur Rahman's email.",
      });
    }

    // 2. If Resend API Key is configured
    if (resendApiKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: siteConfig.email,
          reply_to: trimmedEmail,
          subject: `Portfolio Contact: ${trimmedName}`,
          text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return NextResponse.json(
          { error: errorData?.message || "Failed to deliver email." },
          { status: 502 },
        );
      }

      return NextResponse.json({
        success: true,
        message: "Your message has been delivered to Md. Rezanur Rahman's email.",
      });
    }

    // 3. Fallback when neither endpoint is configured in environment
    const subject = encodeURIComponent(
      `Portfolio message from ${trimmedName}`,
    );
    const mailBody = encodeURIComponent(
      `${trimmedMessage}\n\nFrom: ${trimmedName}\nEmail: ${trimmedEmail}`,
    );
    const mailtoUrl = `mailto:${siteConfig.email}?subject=${subject}&body=${mailBody}`;

    return NextResponse.json({
      success: false,
      configured: false,
      mailtoUrl,
      message:
        "No email delivery endpoint is configured in .env.local yet. Please configure NEXT_PUBLIC_FORMSPREE_ENDPOINT or RESEND_API_KEY.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      },
      { status: 500 },
    );
  }
}
