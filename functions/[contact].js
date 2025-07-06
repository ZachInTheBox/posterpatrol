export async function onRequestPost(context) {
  const formData = await context.request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  if (!name || !email || !subject || !message) {
    return new Response("Missing fields", { status: 400 });
  }

  const RESEND_API_KEY = context.env.RESEND_API_KEY;

  const emailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Poster Patrol <hello@posterpatrol.com>",
      to: "zlunchick@gmail.com", 
      subject: `Contact Form: ${subject}`,
      html: `<strong>From:</strong> ${name} (${email})<br><br>${message.replace(/\n/g, "<br>")}`,
    }),
  });

  if (!emailRes.ok) {
    return new Response("Error sending email", { status: 500 });
  }

  return new Response("Success", { status: 200 });
}
