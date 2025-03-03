const model = require('../helpers/model')

module.exports = {
  getEmployeeTodayPresence: (id) => {
    const query = 'SELECT * FROM employee_presences WHERE id = ?'
    return model(query, id)
  },
  createEmployeeTodayPresence: (data = {}) => {
    const query = `INSERT INTO employee_presences (employee_id, clock_in, clock_in_image, clock_out, clock_out_image, created_at)
        VALUES (?)`
    return model(query, data)
  },
  updateEmployeeTodayPresence: (id, data = {}) => {
    const query = `UPDATE employee_presences SET ? WHERE id = ${id}`
    return model(query, data)
  },
  listEmployeePresence: (page, limit) => {
    const query = `SELECT * FROM employee_presences WHERE `
    return model(query)
  }
}