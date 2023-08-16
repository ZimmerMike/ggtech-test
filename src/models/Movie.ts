import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  // Define fields as per the schema provided.
});

export default mongoose.model('Movie', movieSchema);