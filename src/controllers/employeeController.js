const response = require('../helpers/response')
const joi = require('joi')
const {
  createEmployee,
  getEmployeeByEmail
} = require('../models/employeeModel')

module.exports = {
    presenceEmployee: async (req, res) => {
    try {
      const schema = joi.object({
        image: joi.string().required
      })
      let { value: results, error } = schema.validate(req.body)

      if (error) {
        return response(res, 'Oops! You have to upload image!', 401, false, { error: error.message })
      }

      const { email, password } = results
      const isExists = await getEmployeeByEmail({ email })
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
          await createEmployee(userCostumer)
      }
    } catch (err) {
      return response(res, 'Internal server error', 500, false, { error: err.message })
    }
  },
}