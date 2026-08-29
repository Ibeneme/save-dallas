import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IRegistration extends Document {
  fullName: string;
  email: string; // <-- Added email
  address: string;
  phone: string;
  participation: 'in-person' | 'video';
  subject: string;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>({
  fullName: { type: String, required: true },
  email: { type: String, required: true }, // <-- Added email
  address: { type: String, required: true },
  phone: { type: String, required: true },
  participation: { type: String, enum: ['in-person', 'video'], required: true },
  subject: { type: String, required: true },
}, { timestamps: true });

export default (mongoose.models.Registration as Model<IRegistration>) || 
  mongoose.model<IRegistration>('Registration', RegistrationSchema);