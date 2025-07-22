import Donor from "../models/donor.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import getCoordinates from "../utils/geocode.js";
import jwt from "jsonwebtoken";

export const Checklist = async (req, res) => {
  const { name, phone, email, dob, gender, bloodGroup, address, password, checklist } = req.body;

  // Check eligibility based on checklist
  if (
    checklist.age !== "yes" ||
    checklist.weight !== "yes" ||
    checklist.chronicDisease !== "no" ||
    checklist.testedPositive !== "no" ||
    checklist.bloodTransfusion !== "no" ||
    checklist.onMedication !== "no"
  ) {
    return res.status(400).json({ message: "You are not eligible to be a donor." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const coordinates = await getCoordinates(address);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "donor",
    });

    const donor = await Donor.create({
      user: user._id,
      name,
      phone,
      dob,
      gender,
      bloodGroup,
      address,
      location: { coordinates },
      checklistCompleted: true,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).cookie("token", token).json({
      message: "Donor registered and checklist passed.",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
