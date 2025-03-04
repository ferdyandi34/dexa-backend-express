const { Router } = require ('express')
const { loginUser, createUser } = require('../controllers/authController')
const router = Router()

router.post('/register/user', createUser)
router.post('/login', loginUser)

module.exports = router