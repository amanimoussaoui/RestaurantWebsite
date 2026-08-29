import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { type, email, intruderPhotoBase64, failedAttempts = 3, device = 'Navigateur Web' } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Adresse email requise' }, { status: 400 });
    }

    // Resolve user's actual email from PostgreSQL if available
    let targetRecipientEmail = email.toLowerCase().trim();
    try {
      const dbUser = await db.user.findFirst({
        where: {
          OR: [
            { email: targetRecipientEmail },
            { name: { contains: targetRecipientEmail, mode: 'insensitive' } }
          ]
        }
      });
      if (dbUser?.email) {
        targetRecipientEmail = dbUser.email;
      }
    } catch {}

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465');
    const smtpUser = process.env.SMTP_USER || 'amounatahfouna443@gmail.com';
    const smtpPass = process.env.SMTP_PASS || 'bswquzoipitgfbmx';
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'amounatahfouna443@gmail.com';

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

    const nowFormatted = new Date().toLocaleString('fr-FR', {
      timeZone: 'Europe/Paris',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    if (type === 'INTRUDER_ALERT') {
      // 🚨 INTRUDER SECURITY ALERT WITH WEBCAM PHOTO ATTACHMENT
      const attachmentsList: any[] = [];

      let photoImgTag = `<p style="color: #ef4444 !important; font-weight: bold;">(Aucun flux caméra disponible sur cet appareil)</p>`;

      if (intruderPhotoBase64 && intruderPhotoBase64.startsWith('data:image')) {
        const base64Data = intruderPhotoBase64.replace(/^data:image\/\w+;base64,/, '');
        attachmentsList.push({
          filename: 'intruder_webcam_snapshot.jpg',
          content: Buffer.from(base64Data, 'base64'),
          cid: 'intruder_snapshot'
        });

        photoImgTag = `
          <div style="text-align: center; margin: 25px 0;">
            <div style="font-weight: 800; color: #ffffff !important; font-size: 13px; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 1px;">
              📸 Photo de l'utilisateur devant l'écran capturée en direct :
            </div>
            <img src="cid:intruder_snapshot" alt="Photo Capture Sécurité" style="max-width: 100%; width: 440px; border-radius: 16px; border: 3px solid #ef4444; box-shadow: 0 10px 40px rgba(239,68,68,0.6);" />
          </div>
        `;
      }

      const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ALERTE SÉCURITÉ INTRUSION — Le Crispy</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0d0000; color: #ffffff !important; margin: 0; padding: 20px; }
            p, span, td, th, div, h1, h2, h3, h4, a { color: #ffffff !important; }
          </style>
        </head>
        <body style="background-color: #0d0000; color: #ffffff !important; margin: 0; padding: 20px;">
          <div style="max-width: 640px; margin: 0 auto; background-color: #1a0505; border: 2px solid #ef4444; border-radius: 20px; overflow: hidden; box-shadow: 0 16px 50px rgba(239,68,68,0.4);">
            
            <!-- HEADER ALERTE -->
            <div style="background: linear-gradient(180deg, #3f0909 0%, #1a0505 100%); padding: 30px 20px; text-align: center; border-bottom: 2px solid #ef4444;">
              <h1 style="color: #ef4444 !important; font-size: 26px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0;">
                🚨 ALERTE DE SÉCURITÉ HAUTE PROTECTION
              </h1>
              <div style="color: #ffffff !important; font-size: 13px; margin-top: 8px; font-weight: 700; text-transform: uppercase;">
                Le Crispy Dormans — Système Détection Intrusion
              </div>
            </div>

            <!-- BODY CONTENT -->
            <div style="padding: 32px 24px; color: #ffffff !important;">
              
              <div style="background-color: #450a0a; border: 1.5px solid #f87171; border-radius: 14px; padding: 18px; text-align: center; margin-bottom: 24px;">
                <span style="font-size: 16px; font-weight: 900; color: #ffffff !important; text-transform: uppercase; display: block; margin-bottom: 6px;">
                  ⚠️ ${failedAttempts} TENTATIVES DE MOT DE PASSE INCORRECTES DÉTECTÉES
                </span>
                <span style="font-size: 13px; color: #ffffff !important;">
                  Quelqu'un tente actuellement d'accéder à votre compte <strong>${targetRecipientEmail}</strong> sans votre autorisation.
                </span>
              </div>

              <p style="font-size: 15px; line-height: 1.7; color: #ffffff !important;">
                Bonjour <strong>${targetRecipientEmail}</strong>,<br><br>
                Notre système de sécurité a bloqué l'accès au compte après <strong>${failedAttempts} échecs consécutifs</strong> de mot de passe.<br>
                Conformément à nos politiques de sécurité renforcée, la <strong>caméra frontale de l'appareil</strong> s'est automatiquement activée et a pris un cliché instantané.
              </p>

              ${photoImgTag}

              <!-- AUDIT DETAILS TABLE -->
              <div style="margin-top: 25px; background-color: #270909; border: 1px solid #7f1d1d; border-radius: 12px; padding: 16px;">
                <div style="font-size: 12px; font-weight: 800; color: #ef4444 !important; text-transform: uppercase; margin-bottom: 10px;">
                  📋 DÉTAILS TECHNIQUES DE LA TENTATIVE :
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <tr style="border-bottom: 1px solid #450a0a;">
                    <td style="padding: 8px 0; color: #fca5a5 !important; font-weight: 700;">Compte Cible :</td>
                    <td style="padding: 8px 0; color: #ffffff !important; text-align: right; font-family: monospace;">${targetRecipientEmail}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #450a0a;">
                    <td style="padding: 8px 0; color: #fca5a5 !important; font-weight: 700;">Date & Heure :</td>
                    <td style="padding: 8px 0; color: #ffffff !important; text-align: right; font-family: monospace;">${nowFormatted}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #fca5a5 !important; font-weight: 700;">Statut :</td>
                    <td style="padding: 8px 0; color: #ef4444 !important; font-weight: 900; text-align: right;">BLOQUÉ & CAPTURÉ</td>
                  </tr>
                </table>
              </div>

              <div style="margin-top: 28px; text-align: center;">
                <p style="font-size: 13px; color: #ffffff !important; margin-bottom: 15px;">
                  Si vous n'êtes pas à l'origine de cette tentative, nous vous conseillons de réinitialiser votre mot de passe immédiatement.
                </p>
                <a href="http://localhost:3000/login" style="display: inline-block; background-color: #ef4444; color: #ffffff !important; font-weight: 900; padding: 12px 28px; border-radius: 25px; text-decoration: none; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
                  Sécuriser Mon Compte Maintenant
                </a>
              </div>

            </div>

            <!-- FOOTER -->
            <div style="background-color: #120303; padding: 18px; text-align: center; border-top: 1px solid #450a0a; font-size: 11px; color: #ffffff !important;">
              © 2026 Le Crispy Dormans Security Protocol • 1 rue Jean de Dormans, 51700 Dormans
            </div>

          </div>
        </body>
        </html>
      `;

      const mailOptions = {
        from: `"Sécurité Le Crispy 🚨" <${smtpUser}>`,
        to: targetRecipientEmail,
        cc: [adminEmail, 'amounatahfouna443@gmail.com'],
        subject: `🚨 ALERTE DE SÉCURITÉ: Photo Intrusion Capturée — Compte ${targetRecipientEmail}`,
        html: htmlTemplate,
        attachments: attachmentsList
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email Alerte Sécurité + Photo envoyé au destinataire:', targetRecipientEmail, info.messageId);

      return NextResponse.json({ success: true, messageId: info.messageId, recipient: targetRecipientEmail });

    } else {
      // 🔒 SUCCESSFUL LOGIN SECURITY NOTIFICATION EMAIL
      const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="utf-8">
          <title>Notification de Connexion — Le Crispy</title>
        </head>
        <body style="background-color: #080a08; color: #ffffff !important; font-family: 'Helvetica Neue', Arial, sans-serif; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #111612; border: 2px solid #c9a24a; border-radius: 18px; padding: 28px; color: #ffffff !important;">
            <h2 style="color: #c9a24a !important; margin-top: 0;">🔒 Connexion Réussie à votre Compte</h2>
            <p style="color: #ffffff !important; font-size: 15px; line-height: 1.6;">
              Bonjour <strong>${targetRecipientEmail}</strong>,<br><br>
              Une connexion réussie à votre compte <strong>Le Crispy Dormans</strong> a été effectuée le <strong style="font-family: monospace;">${nowFormatted}</strong>.
            </p>
            <p style="color: #ffffff !important; font-size: 13px;">
              Si vous êtes bien à l'origine de cette action, vous n'avez aucune démarche à effectuer.
            </p>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: `"Le Crispy Sécurité 🔒" <${smtpUser}>`,
        to: targetRecipientEmail,
        cc: [adminEmail, 'amounatahfouna443@gmail.com'],
        subject: `🔒 Notification de Connexion à votre Compte Le Crispy`,
        html: htmlTemplate
      });

      return NextResponse.json({ success: true, recipient: targetRecipientEmail });
    }

  } catch (error: any) {
    console.error('❌ Erreur API /api/notifications/security-alert:', error);
    return NextResponse.json(
      { error: 'Échec de l\'envoi de l\'email d\'alerte de sécurité', details: error.message },
      { status: 500 }
    );
  }
}
