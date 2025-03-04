const model = require('../helpers/model')

module.exports = {
  createEmployee: (data = {}) => {
    const query = `INSERT INTO employees (name, username, email, password, role)
      VALUES (?, ?, ?, ?, ?)`;
    
    const values = [data.name, data.username, data.email, data.password, data.role]; 
    return model(query, values)
  },
  getEmployee: (id = {}) => {
    const query = 'SELECT * FROM employees WHERE id = ?'
    return model(query, id)
  },
  getEmployeeByEmail: (email) => {
    const query = 'SELECT * FROM employees where email = ?'
    return model(query, email)
  },
  getEmployeeByUsername: (username) => {
    const query = 'SELECT * FROM employees where username = ?'
    return model(query, username)
  },
  updateEmployee: (id, data = {}) => {
    const fields = Object.keys(data).map(field => `${field} = ?`).join(", ");
    const values = Object.values(data);

    // Safe SQL query with parameterized inputs
    const query = `UPDATE employees SET ${fields} WHERE id = ?`;

    // Add id as the last parameter
    values.push(id);
    return model(query, values)
  },
  deleteEmployee: (id) => {
    const query = `UPDATE employees SET is_deleted = 1 WHERE id = ${id}`
    return model(query)
  },
}