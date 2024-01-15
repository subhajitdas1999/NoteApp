import mongoose, { Document } from "mongoose";
import * as bcrypt from "bcrypt";
export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  noteCount: number;
  // Add the instance method signature directly in the IUser interface
  checkPassword: (inputPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    noteCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

//this middlewares and methods needs to defined before User model is defined
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 2);
  }
  next();
});

userSchema.methods.checkPassword = async function (
  this: IUser,
  inputPassword: string
): Promise<boolean> {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
