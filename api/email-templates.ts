interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  packageType: string;
  quantity: number;
  message: string;
  applicationId: string;
  createdAt: string;
}

// Email styles
const emailStyles = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .header {
    background: linear-gradient(135deg, #a98dc1 0%, #8e73a8 100%);
    padding: 40px 30px;
    text-align: center;
    color: #ffffff;
  }
  .header h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
  }
  .content {
    padding: 40px 30px;
  }
  .info-box {
    background: #f9fafb;
    border-left: 4px solid #a98dc1;
    padding: 20px;
    margin: 20px 0;
    border-radius: 4px;
  }
  .info-box h3 {
    margin: 0 0 16px 0;
    color: #a98dc1;
    font-size: 18px;
    font-weight: 600;
  }
  .info-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #e5e7eb;
    font-size: 15px;
    gap: 20px;
  }
  .info-row:last-child {
    border-bottom: none;
  }
  .info-label {
    font-weight: 600;
    color: #374151;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  .info-label:after {
    content: ":";
  }
  .info-value {
    color: #111827;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-weight: 400;
  }
  .message-box {
    background: #f9fafb;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }
  .warning-box {
    background: #f3f4f6;
    border-left: 4px solid #6b7280;
    padding: 20px;
    margin: 20px 0;
    border-radius: 4px;
  }
  .warning-box p {
    margin: 0;
    color: #374151;
    font-size: 14px;
  }
  .footer {
    background: #f9fafb;
    padding: 30px;
    text-align: center;
    border-top: 1px solid #e5e7eb;
  }
  .footer p {
    margin: 5px 0;
    color: #6b7280;
    font-size: 14px;
  }
  .button {
    display: inline-block;
    padding: 14px 28px;
    background: linear-gradient(135deg, #a98dc1 0%, #8e73a8 100%);
    color: #ffffff;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    margin: 20px 0;
  }
`;

export function getAdminNotificationEmail(data: ApplicationData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${emailStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 Neue Mastermind Bewerbung</h1>
        </div>

        <div class="content">
          <p style="font-size: 16px; margin-bottom: 24px;">
            Eine neue Bewerbung ist eingegangen und die Zahlung wurde erfolgreich abgeschlossen.
          </p>

          <div class="info-box">
            <h3>Persönliche Informationen</h3>
            <div class="info-row">
              <span class="info-label">Name</span>
              <span class="info-value">${data.firstName} ${data.lastName}</span>
            </div>
            <div class="info-row">
              <span class="info-label">E-Mail</span>
              <span class="info-value">${data.email}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Telefon</span>
              <span class="info-value">${data.phone}</span>
            </div>
          </div>

          <div class="info-box">
            <h3>Paket-Details</h3>
            <div class="info-row">
              <span class="info-label">Gewähltes Paket</span>
              <span class="info-value">Paket ${data.packageType}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Anzahl Tickets</span>
              <span class="info-value">${data.quantity}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Gesamtbetrag</span>
              <span class="info-value">€${(data.packageType === 'A' ? 100 : 200) * data.quantity}</span>
            </div>
          </div>

          <div class="message-box">
            <h3 style="margin: 0 0 12px 0; color: #a98dc1;">Bewerbungsnachricht:</h3>
            <p style="white-space: pre-wrap; margin: 0; color: #374151;">${data.message}</p>
          </div>

          <div class="warning-box">
            <p><strong>⚠️ Wichtig:</strong> Diese Bewerbung muss noch geprüft werden. Bei Ablehnung muss eine Rückerstattung über Stripe durchgeführt werden.</p>
          </div>

          <a href="https://mastermind.abnehmenimliegen-info.com/admin" class="button">
            Zur Admin-Übersicht →
          </a>
        </div>

        <div class="footer">
          <p><strong>Application ID:</strong> ${data.applicationId}</p>
          <p><strong>Eingereicht am:</strong> ${data.createdAt}</p>
          <p style="margin-top: 20px; font-size: 12px;">
            Diese E-Mail wurde automatisch generiert.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function getApplicantConfirmationEmail(data: ApplicationData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${emailStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Bewerbung Eingereicht</h1>
        </div>

        <div class="content">
          <p style="font-size: 18px; margin-bottom: 8px;">
            Hallo ${data.firstName},
          </p>
          <p style="font-size: 16px; color: #6b7280; margin-bottom: 24px;">
            vielen Dank für deine Bewerbung zur exklusiven Mastermind in Dubai!
          </p>

          <div class="info-box">
            <h3>Deine Bewerbungsdetails</h3>
            <div class="info-row">
              <span class="info-label">Paket</span>
              <span class="info-value">Paket ${data.packageType}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Anzahl Tickets</span>
              <span class="info-value">${data.quantity}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Gezahlter Betrag</span>
              <span class="info-value">€${(data.packageType === 'A' ? 100 : 200) * data.quantity}</span>
            </div>
          </div>

          <div class="warning-box">
            <p><strong>📋 Wichtiger Hinweis:</strong></p>
            <p style="margin-top: 8px;">
              Deine Bewerbung wird nun geprüft. Die Zahlung garantiert noch keinen Platz bei der Mastermind.
              Sollte deine Bewerbung nicht genehmigt werden, erhältst du den vollen Betrag automatisch zurückerstattet.
            </p>
          </div>

          <h3 style="color: #a98dc1; margin-top: 32px;">Was passiert als Nächstes?</h3>
          <ol style="color: #374151; line-height: 1.8;">
            <li>Wir prüfen deine Bewerbung sorgfältig</li>
            <li>Du erhältst innerhalb von 48 Stunden eine Rückmeldung</li>
            <li>Bei Genehmigung: Weitere Details zum Event</li>
            <li>Bei Ablehnung: Automatische Rückerstattung des vollen Betrags</li>
          </ol>

          <p style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            Bei Fragen erreichst du uns jederzeit unter:<br>
            <strong style="color: #a98dc1;">jc@abnehmenimliegen.at</strong>
          </p>

          <p style="margin-top: 24px; color: #6b7280;">
            Wir freuen uns auf dich!<br>
            <strong>Das Mastermind Team</strong>
          </p>
        </div>

        <div class="footer">
          <p><strong>Referenznummer:</strong> ${data.applicationId.substring(0, 8)}</p>
          <p style="margin-top: 20px; font-size: 12px;">
            © 2026 Chris Steiner Mastermind | Alle Rechte vorbehalten
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Template for rejection email with refund confirmation
export function getApplicationRejectionEmail(data: {
  firstName: string;
  lastName: string;
  refundAmount: number;
  refundDate: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${emailStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header" style="background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);">
          <h1>Bewerbungsstatus</h1>
        </div>

        <div class="content">
          <p style="font-size: 18px; margin-bottom: 8px;">
            Hallo ${data.firstName},
          </p>
          <p style="font-size: 16px; color: #6b7280; margin-bottom: 24px;">
            vielen Dank für dein Interesse an unserer Mastermind in Dubai.
          </p>

          <p style="font-size: 16px; line-height: 1.8;">
            Nach sorgfältiger Prüfung müssen wir dir leider mitteilen, dass wir deine Bewerbung
            zu diesem Zeitpunkt nicht berücksichtigen können.
          </p>

          <div class="info-box">
            <h3>Rückerstattung</h3>
            <div class="info-row">
              <span class="info-label">Betrag:</span>
              <span class="info-value">€${data.refundAmount}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Status:</span>
              <span class="info-value">Erstattet am ${data.refundDate}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Zahlungsmethode:</span>
              <span class="info-value">Ursprüngliche Zahlungsmethode</span>
            </div>
          </div>

          <div class="warning-box" style="background: #dbeafe; border-left-color: #3b82f6;">
            <p style="color: #1e3a8a;"><strong>ℹ️ Hinweis:</strong></p>
            <p style="margin-top: 8px; color: #1e40af;">
              Der Betrag wurde vollständig zurückerstattet. Die Gutschrift sollte innerhalb von 5-10 Werktagen
              auf deinem Konto sichtbar sein.
            </p>
          </div>

          <p style="margin-top: 32px; color: #374151;">
            Wir wünschen dir alles Gute für deine Zukunft und vielleicht ergibt sich
            bei einer zukünftigen Veranstaltung eine neue Möglichkeit.
          </p>

          <p style="margin-top: 24px; color: #6b7280;">
            Beste Grüße,<br>
            <strong>Das Mastermind Team</strong>
          </p>
        </div>

        <div class="footer">
          <p style="font-size: 12px;">
            Bei Fragen zur Rückerstattung: jc@abnehmenimliegen.at
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
