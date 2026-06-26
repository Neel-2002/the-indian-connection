import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

interface Detail {
  label: string;
  value: string;
}
interface Payload {
  serviceId?: string;
  serviceName?: string;
  details?: Detail[];
  contact?: { name?: string; phone?: string; email?: string };
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

  const name = body.contact?.name?.trim();
  const phone = body.contact?.phone?.trim();
  if (!name || !phone) {
    return NextResponse.json(
      { error: "Name and phone are required." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — cannot send lead email.");
    return NextResponse.json(
      { error: "Email is not configured on the server yet." },
      { status: 500 }
    );
  }

  const service = body.serviceName || "General";
  const details = Array.isArray(body.details) ? body.details : [];
  const email = body.contact?.email?.trim();
  const when = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const urgent = details.some((d) =>
    /tatkal|urgent|last.?minute/i.test(`${d.label} ${d.value}`)
  );

  const rows = details
    .map(
      (d) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#6E5A55;vertical-align:top;white-space:nowrap">${esc(
          d.label
        )}</td><td style="padding:6px 0;color:#2A1418;font-weight:600">${esc(
          d.value
        )}</td></tr>`
    )
    .join("");

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;background:#FBF6EC;padding:24px;border-radius:16px">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#C24E12;font-weight:700">New concierge request</p>
    <h1 style="margin:0 0 2px;color:#681321;font-size:24px">${esc(service)}${
    urgent ? ' <span style="color:#C24E12">· URGENT</span>' : ""
  }</h1>
    <p style="margin:0 0 18px;color:#6E5A55;font-size:13px">Received ${esc(
      when
    )} IST</p>

    <div style="background:#ffffff;border:1px solid #E7DAC6;border-radius:12px;padding:16px 18px;margin-bottom:16px">
      <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#174F72;font-weight:700">Customer</p>
      <p style="margin:0;color:#2A1418;font-size:16px;font-weight:700">${esc(
        name
      )}</p>
      <p style="margin:4px 0 0;color:#2A1418">📞 <a href="tel:${esc(
        phone
      )}" style="color:#8E1F2F">${esc(phone)}</a>${
    email
      ? ` &nbsp;·&nbsp; ✉️ <a href="mailto:${esc(
          email
        )}" style="color:#8E1F2F">${esc(email)}</a>`
      : ""
  }</p>
    </div>

    <div style="background:#ffffff;border:1px solid #E7DAC6;border-radius:12px;padding:16px 18px">
      <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#174F72;font-weight:700">Request details</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">${
        rows || '<tr><td style="color:#6E5A55">No details provided.</td></tr>'
      }</table>
    </div>

    <p style="margin:18px 0 0;color:#6E5A55;font-size:12px">The Indian Connection · Redefining Bookings</p>
  </div>`;

  const text =
    `New concierge request — ${service}${urgent ? " (URGENT)" : ""}\n` +
    `Received ${when} IST\n\n` +
    `Customer: ${name}\nPhone: ${phone}${email ? `\nEmail: ${email}` : ""}\n\n` +
    `Details:\n` +
    details.map((d) => `  • ${d.label}: ${d.value}`).join("\n");

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New request: ${service}${urgent ? " · URGENT" : ""} — ${name}`,
      replyTo: email || undefined,
      html,
      text,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send the request. Please try again." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Send failed:", e);
    return NextResponse.json(
      { error: "Could not send the request. Please try again." },
      { status: 500 }
    );
  }
}
