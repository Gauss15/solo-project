const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
console.log('SECRET', SECRET);

const register = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    console.log('USER CREATED', newUser);
    const userToken = jwt.sign(
      { _id: newUser._id, email: newUser.email, username: newUser.username },
      SECRET,
    );
    console.log('JWT:', userToken);
    res
      .status(201)
      .cookie('userToken', userToken, { expires: new Date(Date.now() + 9000000) })
      .json({ successMessage: 'user created', user: newUser });
  } catch (error) {
    console.log('Register ERROR', error);
    res.status(400).json(error);
  }
};

const login = async (req, res) => {

  const userDocument = await User.findOne({ email: req.body.email });
  console.log('USERDOC', userDocument);
  if (!userDocument) {
    res.status(400).json({ error:'Email Cant be blank' });
    return;
  } else {
    try {
      const isPasswordValid = await bcrypt.compare(req.body.password, userDocument.password);
      if (!isPasswordValid) {
        res.status(400).json({ error: 'invalid email/password' });
        return;
      } else {
        const userToken = jwt.sign(
          { _id: userDocument._id, email: userDocument.email, username: userDocument.username },
          SECRET,
        );
        console.log('JWT:', userToken);
        res
          .status(201)
          .cookie('userToken', userToken, { expires: new Date(Date.now() + 9000000) })
          .json({ successMessage: 'user loggedin', user: userDocument });
      }
    } catch (error) {
      console.log('LOGIN ERROR', error);
      res.status(400).json({ error: 'invalid email/password' });
    }
  }
}

//   const { body } = req;
//   if (!body.email) {
//     res.status(400).json({ error: "No email provided" });
//     return;
//   }

//   let userDocument;
//   try {
//     userDocument = await User.findOne( { email: body.email });
//     if ( userDocument === null){
//       res.status(400).json( { msg: "Email not found" });
//     }
//   } catch (error) {
//     res.status(400).json(error);
//   }

//   const passwordCheck = bcrypt.compareSync( req.body.password, userDocument.password);

//   if (!passwordCheck) {
//     res.status(400).json( { error: "Email/Password do not match!" } );
//     return;
//   }

//   const userToken = jwt.sign( { _id: userDocument._id, email: userDocument.email, username: userDocument.username }, SECRET)
//   console.log(userToken);

//   res.cookie("userToken" , userToken, { httpOnly: true, expires: new Date(Date.now() + 900000000),} )
//   .json( { msg: "Logged In Successfully"});
// };

const logout = (req, res) => {
  res.clearCookie('userToken');
  res.json({ successMessage: 'User logged out' });
};

const getLoggedInUser = async (req, res) => {
  try {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    User.findOne({ _id: user._id });
    res.json(user);
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
};