const response = require('../helpers/response')
const joi = require('joi')
const {
  getEmployeeTodayPresence,
  createEmployeeTodayPresence,
  updateEmployeeTodayPresence,
  listEmployeePresence
} = require('../models/employeePresenceModel')
const moment = require('moment')

module.exports = {
  presenceEmployee: async (req, res) => {
    try {
      const schema = joi.object({
        employee_id: joi.number().required(),
        image: joi.string().required()
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
        role: joi.string().valid('Admin').required(),
        page: joi.number().required(),
        limit: joi.number().max(100).required(),
        date: joi.string()
      })
      let { value: results, error } = schema.validate(req.body)

      if (error) {
        return response(res, 'Oops! You must be an admin to access this page!', 401, false, { error: error.message })
      }

      const { page, limit, date } = results
      const listPresences = await listEmployeePresence(page, limit, date)
      let data = [];
      if(listPresences.length == 0){
        return response(res, 'List employee presence success!', 200, true, { data })
      }
      for(const element of listPresences){
        const arr = {
          id: element.employee_id,
          name: element.name,
          role: element.role,
          clock_in: element.clock_in ?? '',
          clock_in_image: element.clock_in_image ?? '',
          clock_out: element.clock_out ?? '',
          clock_out_image: element.clock_out_image ?? '',
          created_at: element.created_at ?? ''
        };
        data.push(arr)
      }
      return response(res, 'List employee presence success!', 200, true, { page: page, limit: limit, data: data })
    } catch (err) {
      return response(res, 'Internal server error', 500, false, { error: err.message })
    }
  },
}