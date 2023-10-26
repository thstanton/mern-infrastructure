import express from 'express'
export const router = express.Router()
import { users } from '../../controllers/api/users.js'
import ensureLoggedIn from '../../config/ensureLoggedIn.js'

// GET /api/users/check-token 
router.get('/check-token', ensureLoggedIn, users.checkToken)

// POST /api/users
router.post('/', users.create)

// POST /api/users/login
router.post('/login', users.login)
