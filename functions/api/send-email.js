export async function onRequestPost(context) {
  const body = await context.request.json();
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + context.env.RESEND_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "JAZB <no-reply@jazbwear.pk>",
      to: body.to,
      subject: body.subject,
      html: body.html
    })
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" }
  });
}
