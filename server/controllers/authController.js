import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", email);

<<<<<<< HEAD
        const token = jwt.sign({_id: user._id, role: user.role},
            process.env.JWT_KEY, {expiresIn: "10d"}
        )

        res.status(200).json({
            success: true, 
            token, 
            user: {_id: user._id, name: user.name, role: user.role},
        });

    } catch (error) {
        res.status(500).json({success: false, error: error.message});
=======
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
      });
>>>>>>> e21bf6c (Fix login authentication with bcrypt and JWT)
    }

<<<<<<< HEAD
const verify = (req, res) => {
    return res.status(200).json({success: true, user: req.user});
}

export { login, verify };
=======
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

export { login };
>>>>>>> e21bf6c (Fix login authentication with bcrypt and JWT)
