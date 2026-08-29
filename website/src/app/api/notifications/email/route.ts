import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { order, customerEmail } = await req.json();

    if (!order) {
      return NextResponse.json({ error: 'Order details missing' }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465');
    const smtpUser = process.env.SMTP_USER || 'amounatahfouna443@gmail.com';
    const smtpPass = process.env.SMTP_PASS || 'bswquzoipitgfbmx';
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'amounatahfouna443@gmail.com';

    // Target the real customer email address passed from checkout or profile
    const userEmailRecipient = customerEmail || order.userEmail || order.email || adminEmail;

    // Create Nodemailer Transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Format item list in HTML (PURE WHITE TEXT WITH GOLD ACCENTS)
    const itemsHtml = Array.isArray(order.items)
      ? order.items.map((it: any) => `
          <tr style="border-bottom: 1px solid #2a2a2a;">
            <td style="padding: 14px 12px; color: #ffffff !important; font-weight: 700; font-size: 14px;">
              <span style="color: #c9a24a !important; font-weight: 900;">${it.quantity}x</span> ${it.product?.name?.fr || it.product?.name || 'Produit Gourmet'}
              ${it.notes ? `<div style="color: #dddddd !important; font-size: 12px; font-weight: normal; margin-top: 4px;">└ ${it.notes}</div>` : ''}
            </td>
            <td style="padding: 14px 12px; color: #ffffff !important; font-weight: 900; text-align: right; font-size: 15px; font-family: monospace;">
              ${(it.product?.price * it.quantity).toFixed(2)} €
            </td>
          </tr>
        `).join('')
      : '';

    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de Commande — Le Crispy Dormans</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #080a08; color: #ffffff !important; margin: 0; padding: 20px; }
          p, span, td, th, div, h1, h2, h3, h4, li, a { color: #ffffff !important; }
        </style>
      </head>
      <body style="background-color: #080a08; color: #ffffff !important; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; margin: 0;">
        <div style="max-width: 620px; margin: 0 auto; background-color: #111612; border: 2px solid #c9a24a; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.95);">
          
          <!-- Header Logo & Brand -->
          <div style="background: linear-gradient(180deg, #18221b 0%, #0d140e 100%); padding: 32px 20px; text-align: center; border-bottom: 2px solid #c9a24a;">
            <h1 style="color: #ffffff !important; font-size: 28px; font-weight: 900; letter-spacing: 2.5px; text-transform: uppercase; margin: 0; font-family: Georgia, serif;">👑 LE CRISPY DORMANS</h1>
            <div style="color: #ffffff !important; font-size: 14px; margin-top: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Restaurant Fast-Food Gourmet — 1 rue Jean de Dormans</div>
          </div>

          <!-- Main Body Content -->
          <div style="padding: 32px 24px; color: #ffffff !important;">
            
            <!-- Confirmed Badge -->
            <div style="text-align: center; margin-bottom: 28px;">
              <span style="display: inline-block; background-color: #c9a24a; color: #000000 !important; font-weight: 900; padding: 9px 24px; border-radius: 25px; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; box-shadow: 0 4px 15px rgba(201,162,74,0.4);">
                ✓ PAIEMENT ET COMMANDE CONFIRMÉS
              </span>
            </div>

            <!-- Greeting -->
            <p style="font-size: 16px; line-height: 1.7; color: #ffffff !important; margin-bottom: 22px;">
              Chers Clients, <strong style="color: #ffffff !important;">${order.userName || 'Gourmet'}</strong>,<br><br>
              Nous avons le plaisir de vous informer que votre paiement en ligne a été validé avec succès. Votre commande référence <strong style="color: #ffffff !important; font-family: monospace;">#${order.id}</strong> a bien été enregistrée et transmise en cuisine à notre Chef ! 👨‍🍳
            </p>

            <!-- Order Details Table -->
            <div style="margin-top: 25px;">
              <div style="font-size: 13px; font-weight: 800; color: #ffffff !important; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                📋 Récapitulatif de votre Commande :
              </div>
              <table style="width: 100%; border-collapse: collapse; background-color: #161e18; border-radius: 12px; overflow: hidden; border: 1px solid #28362b;">
                <thead>
                  <tr style="border-bottom: 2px solid #c9a24a; text-align: left; background-color: #1d2920;">
                    <th style="padding: 12px; color: #ffffff !important; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Article</th>
                    <th style="padding: 12px; text-align: right; color: #ffffff !important; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Prix Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </div>

            <!-- Total Price Box -->
            <div style="background-color: #1a251e; border: 1.5px solid #c9a24a; border-radius: 14px; padding: 20px; margin-top: 25px; text-align: right;">
              <span style="color: #ffffff !important; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Montant Total Réglé :</span>
              <div style="color: #ffffff !important; font-size: 28px; font-weight: 900; font-family: monospace;">${Number(order.total).toFixed(2)} €</div>
            </div>

            <!-- Service Mode & Delivery Box -->
            <div style="background-color: #161e18; padding: 20px; border-radius: 14px; margin-top: 25px; font-size: 14px; color: #ffffff !important; border-left: 5px solid #c9a24a; line-height: 1.7; border: 1px solid #28362b; border-left-width: 5px;">
              <strong style="color: #ffffff !important; display: block; margin-bottom: 8px; font-size: 15px;">📍 Informations de Livraison & Service :</strong>
              • Mode de commande : <strong style="color: #ffffff !important;">${(order.serviceMode || 'Livraison').toUpperCase()}</strong><br>
              ${order.deliveryAddress ? `• Adresse de livraison : <strong style="color: #ffffff !important;">${order.deliveryAddress.street}, ${order.deliveryAddress.city} (${order.deliveryAddress.zipCode || '51700'})</strong>` : order.tableNumber ? `• Numéro de Table : <strong style="color: #ffffff !important;">Table #${order.tableNumber}</strong>` : '• Retrait : À emporter directement au restaurant'}<br>
              • Téléphone de contact : <strong style="color: #ffffff !important;">${order.userPhone || '09 56 07 00 91'}</strong>
            </div>

            <p style="font-size: 14px; line-height: 1.6; color: #ffffff !important; margin-top: 25px; text-align: center;">
              Toute l'équipe de <strong>Le Crispy Dormans</strong> vous remercie pour votre confiance et vous souhaite une excellente dégustation ! 🚀
            </p>

          </div>

          <!-- Footer -->
          <div style="background-color: #0b0f0c; padding: 24px; text-align: center; font-size: 12px; color: #ffffff !important; border-top: 1px solid #243026; line-height: 1.7;">
            <strong style="color: #ffffff !important; font-size: 13px;">Le Crispy Dormans</strong> — Fast-Food Haute Gastronomie<br>
            📍 1 rue Jean de Dormans, 51700 Dormans | 📞 Tél : <strong style="color: #ffffff !important;">09 56 07 00 91</strong><br>
            🕒 Horaires : Ouvert 7j/7 de 11h00 à 23h00 Non Stop
          </div>

        </div>
      </body>
      </html>
    `;

    // Send email directly to the USER's email address, and copy admin email
    const mailOptions = {
      from: `"Le Crispy Dormans" <${smtpUser}>`,
      to: userEmailRecipient,
      cc: adminEmail !== userEmailRecipient ? adminEmail : undefined,
      subject: `✨ Confirmation de votre Commande #${order.id} — Le Crispy Dormans (${Number(order.total).toFixed(2)} €)`,
      html: htmlTemplate
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Gmail Professional Payment Confirmation Sent to:', userEmailRecipient, 'Message ID:', info.messageId);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      sentTo: userEmailRecipient,
      adminCopied: adminEmail
    });
  } catch (error: any) {
    console.error('Email Notification API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send confirmation email' }, { status: 500 });
  }
}
