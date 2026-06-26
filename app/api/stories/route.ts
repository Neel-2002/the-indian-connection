import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

interface Payload {
  name?: string;
  location?: string;
  rating?: number;
  story?: string;
  hp?: string; // honeypot
}

const FROM = process.env.LEAD_FROM || "The Indian Connection <onboarding@resend.dev>";
const TO = process.env.LEAD_INBOX || "jainneelrock@gmail.com";

function esc(s: string) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — silently accept bots without sending
  if (body.hp) return NextResponse.json({ ok: true });

  const name = body.name?.trim();
  const story = body.story?.trim();
  const location = body.location?.trim();
  const rating = Math.min(5, Math.max(1, Number(body.rating) || 5));

  if (!name || !story) {
    return NextResponse.json(
      { error: "Name and story are required." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — cannot send story email.");
    return NextResponse.json(
      { error: "Submissions are not configured on the server yet." },
      { status: 500 }
    );
  }

  const when = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;background:#FBF6EC;padding:24px;border-radius:16px">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#C24E12;font-weight:700">New story — needs review</p>
    <h1 style="margin:0 0 2px;color:#681321;font-size:22px">${esc(name)}</h1>
    <p style="margin:0 0 4px;color:#174F72;font-weight:600">${esc(location || "—")}</p>
    <p style="margin:0 0 14px;color:#C24E12;font-size:18px;letter-spacing:2px">${stars} <span style="color:#6E5A55;font-size:13px">(${rating}/5)</span></p>
    <div style="background:#ffffff;border:1px solid #E7DAC6;border-radius:12px;padding:16px 18px;color:#2A1418;font-size:15px;line-height:1.6">${esc(
      story
    ).replace(/\n/g, "<br>")}</div>
    <p style="margin:14px 0 0;color:#6E5A55;font-size:12px">Submitted ${esc(
      when
    )} IST · The Indian Connection</p>
  </div>`;

  const text =
    `New story (needs review)\n${name} — ${location || "—"}\nRating: ${rating}/5\n\n${story}\n\nSubmitted ${when} IST`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New story to review — ${name} (${rating}★)`,
      html,
      text,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not submit your story. Please try again." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Send failed:", e);
    return NextResponse.json(
      { error: "Could not submit your story. Please try again." },
      { status: 500 }
    );
  }
}
