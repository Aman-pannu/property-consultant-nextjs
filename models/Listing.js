import mongoose from 'mongoose'
const ListingSchema = new mongoose.Schema({
  title: String,
  meta: String,
  image: String,
  badges: [String],
  suburb: String,
  slug: String,
  virtualTour: String
}, { timestamps: true })
export default mongoose.models.Listing || mongoose.model('Listing', ListingSchema)
