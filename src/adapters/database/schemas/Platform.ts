import mongoose from 'mongoose';
import { IPlatform } from '../../../domain/models/PlatformModel';

const platformSchema = new mongoose.Schema({
	icon: String,
	title: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: Date,
});

const PlatformModel = mongoose.model<IPlatform>('Platform', platformSchema);

export default PlatformModel;