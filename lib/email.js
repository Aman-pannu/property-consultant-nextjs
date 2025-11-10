import nodemailer from 'nodemailer'

function getTransport(){
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env
  if(!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 465),
    secure: String(SMTP_SECURE) !== 'false',
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  })
  return transporter
}

export async function sendMail({ subject, text }){
  const transporter = getTransport()
  if(!transporter) return false
  try{
    await transporter.sendMail({ from: `Lead Bot <${process.env.SMTP_USER}>`, to: process.env.LEAD_TO, subject, text })
    return true
  }catch(err){
    console.error('Email send failed', err)
    return false
  }
}

export async function sendLeadEmail(lead){
  const subject = `New Lead: ${lead.name} (${lead.service || 'General'})`
  const text = `Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone || '-'}
Service: ${lead.service || '-'}
Stage: ${lead.stage || 'New'}

Message:
${lead.message || '-'}`
  await sendMail({ subject, text })
}
