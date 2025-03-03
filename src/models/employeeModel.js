const model = require('../helpers/model')

module.exports = {
  createEmployee: (data = {}) => {
    const query = `INSERT INTO employees (name, username, email, password, role)
      VALUES (?)`
    return model(query, data)
  },
  getEmployee: (id = {}) => {
    const query = 'SELECT * FROM employees WHERE id = ?'
    return model(query, id)
  },
  getEmployeeByEmail: (email) => {
    const query = 'SELECT * FROM employees where email = ?'
    return model(query, email)
  },
  updateEmployee: (id, data = {}) => {
    const query = `UPDATE employees SET ? WHERE id = ${id}`
    return model(query, data)
  },
  deleteEmployee: (id) => {
    const query = `UPDATE employees SET is_deleted = 1 WHERE id = ${id}`
    return model(query)
  },
}