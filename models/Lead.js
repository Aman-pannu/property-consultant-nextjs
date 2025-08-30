import mongoose from 'mongoose'

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  service: String,
  message: String,
  stage: { type: String, default: 'New' }, // New, Qualified, In Progress, Won, Lost
  tags: [String],
  notes: String,
  followUpAt: Date
}, { timestamps: true })

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema)
