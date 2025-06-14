import { Hono } from "hono";
import { Resend } from "resend";
import { EmailTemplate } from "./emails/email-template";

const app = new Hono();
// ここは発行されたAPIキーを書く
const resend = new Resend("re_xxx");

app.get("/", async (c) => {
  const { data, error } = await resend.emails.send({
    // ここのfromは独自ドメインである必要があるんだと思う．
    from: "Acme <onboarding@resend.dev>",
    to: ["garireodragon@gmail.com"],
    subject: "hello world",
    react: <EmailTemplate firstName="Maki" />,
  });

  if (error) {
    return c.json(error, 400);
  }

  return c.json(data);
});

export default app;
