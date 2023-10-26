import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import User from "../../models/user.js"

async function create(req, res) {
    try {
        const user = await User.create(req.body)
        const token = createJWT(user)
        res.json(token)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function login(req, res) {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({ email: email })
        const match = await bcrypt.compare(password, user.password);
        if(match) {
            const token = createJWT(user)
            return res.json(token)
        } else {
            res.json({ error: 'invalid password' })
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
  }

/*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
      // data payload
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
  }

export const users = {
    create, 
    login,
    checkToken
}