import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAIL = "t.one.reform@gmail.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name?: string;
      phone?: string;
      email?: string;
      message?: string;
      inquiryTypes?: string[];
    };

    const { name, phone, email, message, inquiryTypes } = body;

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "お名前とご相談内容は必須です" },
        { status: 400 }
      );
    }

    const inquiryText =
      Array.isArray(inquiryTypes) && inquiryTypes.length > 0
        ? inquiryTypes.join("、")
        : "未選択";

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      return NextResponse.json(
        { error: "メール設定が完了していません" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    await transporter.sendMail({
      from: `"t-one reform お問い合わせ" <${gmailUser}>`,
      to: TO_EMAIL,
      replyTo: email?.trim() || gmailUser,
      subject: `【HP問い合わせ】${name}様よりご連絡`,
      text: [
        `お名前：${name}`,
        `電話番号：${phone || "未記入"}`,
        `メールアドレス：${email || "未記入"}`,
        `ご相談の種類：${inquiryText}`,
        ``,
        `【ご相談内容】`,
        message,
      ].join("\n"),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#c17f24;border-bottom:2px solid #c17f24;padding-bottom:8px">
            HPよりお問い合わせがありました
          </h2>
          <table style="border-collapse:collapse;width:100%;margin-top:16px">
            <tr>
              <td style="padding:10px 12px;border:1px solid #e0d8ce;background:#faf4ea;width:160px;font-weight:bold;color:#5a4a3a">お名前</td>
              <td style="padding:10px 12px;border:1px solid #e0d8ce">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;border:1px solid #e0d8ce;background:#faf4ea;font-weight:bold;color:#5a4a3a">電話番号</td>
              <td style="padding:10px 12px;border:1px solid #e0d8ce">${escapeHtml(phone || "未記入")}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;border:1px solid #e0d8ce;background:#faf4ea;font-weight:bold;color:#5a4a3a">メールアドレス</td>
              <td style="padding:10px 12px;border:1px solid #e0d8ce">${escapeHtml(email || "未記入")}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;border:1px solid #e0d8ce;background:#faf4ea;font-weight:bold;color:#5a4a3a">ご相談の種類</td>
              <td style="padding:10px 12px;border:1px solid #e0d8ce">${escapeHtml(inquiryText)}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;border:1px solid #e0d8ce;background:#faf4ea;font-weight:bold;color:#5a4a3a;vertical-align:top">ご相談内容</td>
              <td style="padding:10px 12px;border:1px solid #e0d8ce;white-space:pre-wrap">${escapeHtml(message)}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      "Contact API error:",
      error instanceof Error ? error.message : "unknown"
    );
    return NextResponse.json(
      { error: "送信に失敗しました。しばらくしてから再度お試しください。" },
      { status: 500 }
    );
  }
}
