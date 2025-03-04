const jwt = require('jsonwebtoken')
const response = require('../helpers/response')
const joi = require('joi')
const bcrypt = require('bcryptjs')
const {
  createEmployee,
  getEmployeeByUsername
} = require('../models/employeeModel')

module.exports = {
  createUser: async (req, res) => {
    try {
      console.log(req.body)
      const schema = joi.object({
        username: joi.string().required(),
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        role: joi.string().valid('Admin','Employee').required()
      })
      let { value: results, error } = schema.validate(req.body)

      if (error) {
        return response(res, 'Oops! You have to fill all form for register!', 401, false, { error: error.message })
      }

      const { email, password } = results
      const isExists = await getEmployeeByEmail(email)
      if (isExists.length > 0) {
        return response(res, 'Email already used', 401, false)
      } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userCostumer = {
          name: results.name,
          username: results.username,
          email: results.email,
          password: hashedPassword,
          role: results.role
        }
          const data = await createEmployee(userCostumer)
          return response(res, 'Congratulation! Now you have an account!', 200, true, { id: data.id })
      }
    } catch (err) {
      return response(res, 'Internal server error', 500, false, { error: err.message })
    }
  },

  loginUser: async (req, res) => {
    try {
      console.log(req.body)
      const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required()
      })
      const { value, error } = schema.validate(req.body)
      if (error) {
        return response(res, 'Login Failed', 401, false)
      }

      const { username, password } = value
      const data = await getEmployeeByUsername(username)
      if (data.length === 1) {
        const user = data[0]
        const pass = bcrypt.compareSync(password, user.password)
        if (pass) {
          const token = jwt.sign({ id: user.id, role_id: user.role_id }, 'KODERAHASIA')
          return response(res, 'Login Successfully', 200, true, { id: data.id, token: token })
        } else {
          return response(res, 'Wrong password', 400, false)
        }
      } else {
        return response(res, 'Wrong username', 400, false)
      }
    } catch (err) {
      return response(res, 'Internal server error', 500, false, { error: err.message })
    }
  }
}