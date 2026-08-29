import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAdmin extends Document {
    email: string;
    otp?: string;
    otpExpires?: Date;
    createdAt: Date;
}

const AdminSchema = new Schema<IAdmin>({
    email: { type: String, required: true, unique: true, lowercase: true },
    otp: { type: String },
    otpExpires: { type: Date },
}, { timestamps: true });

export default (mongoose.models.Admin as Model<IAdmin>) ||
    mongoose.model<IAdmin>('Admin', AdminSchema);