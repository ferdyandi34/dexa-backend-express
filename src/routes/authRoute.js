const { body } = require ('express-validator')
const { Router } = require ('express')
const { loginUser, createUser } = require('../controllers/authController')
const router = Router()

const createUserValidator = [
    body('username', 'Invalid, username must not Empty').not().isEmpty(),
    body('name', 'Invalid, name must not Empty').not().isEmpty(),
    body('email', 'Invalid, email must not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
    body('role', 'Invalid role only Admin or Employee').isIn(['Admin','Employee'])
  ]

  const loginValidator = [
    body('username', 'Invalid, username must not Empty').not().isEmpty(),
    body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
  ]

router.post('/register/user', createUserValidator, createUser)
router.post('/login', loginValidator, loginUser)

module.exports = router