import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min:[6, "Your password can not not be less than 6 characters"],
    max:[20, "Your password can not be larger than 20 characters"]
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const UserModel = new mongoose.model('User', userSchema);

export default UserModel;
