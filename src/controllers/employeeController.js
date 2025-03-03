const response = require('../helpers/response')
const joi = require('joi')
const {
  getEmployeeTodayPresence,
  createEmployeeTodayPresence,
  updateEmployeeTodayPresence
} = require('../models/employeePresenceModel')
const moment = require('moment')

module.exports = {
  presenceEmployee: async (req, res) => {
    try {
      const schema = joi.object({
        employee_id: joi.number().required,
        image: joi.string().required
      })
      let { value: results, error } = schema.validate(req.body)

      if (error) {
        return response(res, 'Oops! You have to upload image!', 401, false, { error: error.message })
      }

      const { employee_id, image } = results
      const isExists = await getEmployeeTodayPresence(employee_id)
      if (isExists.length && isExists.clock_in && isExists.clock_out) {
        return response(res, `Today's presence already filled`, 401, false)
      } else if (!isExists.length){ // Clock in
        const data = {
          employee_id: employee_id,
          clock_in: moment().date(),
          clock_in_image: image,
          clock_out: null,
          clock_out_image: null,
          created_at: moment().date()
        }
          await createEmployeeTodayPresence(data)
          return response(res, 'Clock in success!', 200, true, { data })
      } else { // Clock out
        const data = {
          clock_out: moment().date(),
          clock_out_image: image,
        }
        await updateEmployeeTodayPresence(employee_id, data)
        return response(res, 'Clock out success!', 200, true, { data })
      }
    } catch (err) {
      return response(res, 'Internal server error', 500, false, { error: err.message })
    }
  },

  listEmployee: async (req, res) => {
    try {
      const schema = joi.object({
        role: joi.string().required,
        page: joi.number(1).required,
        limit: joi.number(10).required
      })
      let { value: results, error } = schema.validate(req.body)

      if (error) {
        return response(res, 'Oops! You must be an admin to access this page!', 401, false, { error: error.message })
      }

      const { page, limit } = results
      const todayPresences = await getEmployeeTodayPresence(employee_id)
      if(todayPresences.length == 0){
        return response(res, )
      }
    } catch (err) {
      return response(res, 'Internal server error', 500, false, { error: err.message })
    }
  },
}