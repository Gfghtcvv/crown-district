export async function onRequestPost({ request }) {
  const RESEND_KEY = "re_gDTjSv6n_nnTxJorQMxv1BtBQMhj5e5Y8yai";
  const from = "JAZB <no-reply@jazbwear.pk>";
  try {
    const { to, subject, html } = await request.json();
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + RESEND_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ from, to, subject, html })
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
