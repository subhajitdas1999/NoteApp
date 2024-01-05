import mongoose from "mongoose";

interface IUser {
  email: string;
  password: string;
  noteCount: number;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: String,
  noteCount: Number,
});
const User = mongoose.model("User", userSchema);
export default User;
