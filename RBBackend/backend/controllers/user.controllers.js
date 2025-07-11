import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import generatedToken from '../utils/token.js';


const user = {}

user.register = async (req, res) => {
  try {
    const { userName, email, password, dateOfBirth } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword, dateOfBirth });
    await newUser.save();

    const token = generatedToken(newUser._id);
    res.status(201).json({ user: { userName: newUser.userName, email: newUser.email, dateOfBirth: newUser.dateOfBirth }, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}


user.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generatedToken(user._id);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export default user