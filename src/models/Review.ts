import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  // Define fields as per the schema provided.
});

export default mongoose.model('Review', reviewSchema);