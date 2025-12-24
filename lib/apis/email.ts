import emailjs from "@emailjs/nodejs";

export async function sendEmail(
  email: string,
  categories: string,
  articles_count: number,
  newsletter_content: string,
) {
  const templateParams = {
    email,
    categories,
    articles_count,
    current_date: new Date().toLocaleDateString("pl-PL"),
    newsletter_content,
  };

  await emailjs.send(
    process.env.EMAILJS_SERVICE_ID!,
    process.env.EMAILJS_TEMPLATE_ID!,
    templateParams,
    {
      publicKey: process.env.EMAILJS_PUBLIC_KEY!,
      privateKey: process.env.EMAILJS_PRIVATE_KEY!,
    },
  );
}
