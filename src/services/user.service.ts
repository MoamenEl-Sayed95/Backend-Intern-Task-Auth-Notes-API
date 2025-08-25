import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

export const registerUser = async (data: Partial<IUser>) => {
    const existing = await User.findOne({ email: data.email });
    if (existing) throw new Error('User with this email already exists');
    
    const hashed = await bcrypt.hash(data.password as string, 10);
    const user = new User({ ...data, password: hashed });
    await user.save();

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
    )

    return { token }
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new Error('Invalid credentials');

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
    )

    return { token, lastLogin: user.lastLogin }
};

export const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')

  const valid = await bcrypt.compare(oldPassword, user.password)
  if (!valid) throw new Error('Old password is incorrect')

  const hashed = await bcrypt.hash(newPassword, 10)
  user.password = hashed
  await user.save()
};