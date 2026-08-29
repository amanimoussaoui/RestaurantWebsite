import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { phone, message, orderId, total } = await req.json();

    if (!phone || !message) {
      return NextResponse.json({ error: 'Phone number and message are required' }, { status: 400 });
    }

    // Format clean phone number
    const cleanPhone = phone.replace(/[^0-9]/g, '');

    // Official WhatsApp Web & Direct API Dispatch URL
    const whatsappApiUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;

    // If TWILIO / META credentials exist in environment variables, trigger server-to-server API call
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

    let twilioSent = false;

    if (twilioAccountSid && twilioAuthToken) {
      try {
        const twilioRes = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString('base64')}`
            },
            body: new URLSearchParams({
              From: twilioWhatsAppNumber,
              To: `whatsapp:+${cleanPhone}`,
              Body: message
            })
          }
        );
        if (twilioRes.ok) {
          twilioSent = true;
        }
      } catch (err) {
        console.error('Twilio WhatsApp API Error:', err);
      }
    }

    return NextResponse.json({
      success: true,
      twilioSent,
      whatsappApiUrl,
      recipient: cleanPhone,
      messageSent: message
    });
  } catch (error) {
    console.error('WhatsApp Notification API Error:', error);
    return NextResponse.json({ error: 'Failed to process WhatsApp notification' }, { status: 500 });
  }
}
