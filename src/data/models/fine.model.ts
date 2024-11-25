import mongoose from 'mongoose';

const fineSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
    min: 0,
  },
  limit: {
    type: Number,
    required: true,
    min: 0,
  },
  lat: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  lng: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
  isEmailSent: {
    type: Boolean,
    default: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
  }
});

export const FineModel = mongoose.model('Fine', fineSchema);
