const model = require('../helpers/model')

module.exports = {
  getEmployeeTodayPresence: (id) => {
    const query = 'SELECT * FROM employee_presences WHERE id = ?'
    return model(query, id)
  },
  createEmployeeTodayPresence: (data = {}) => {
    const query = `INSERT INTO employee_presences (employee_id, clock_in, clock_in_image, clock_out, clock_out_image, created_at)
        VALUES (?, ?, ?, ?, ?, ?)`;
    
    const values = [
        data.employee_id, 
        data.clock_in, 
        data.clock_in_image, 
        data.clock_out, 
        data.clock_out_image, 
        data.created_at
    ];
    return model(query, values)
  },
  updateEmployeeTodayPresence: (id, data = {}) => {
    const fields = Object.keys(data).map(field => `${field} = ?`).join(", ");
    const values = Object.values(data);

    const query = `UPDATE employee_presences SET ${fields} WHERE id = ?`;

    // Add id as the last parameter
    values.push(id);
    return model(query, values)
  },
  listEmployeePresence: (page, limit, custom_date) => {
    let query = `SELECT e.id as employee_id, e.name as name, e.role as role, ep.clock_in as clock_in, ep.clock_in_image as clock_in_image, ep.clock_out as clock_out, ep.clock_out_image as clock_out_image, ep.created_at as created_at
      FROM employee_presences ep
      LEFT JOIN employees e ON e.id = ep.employee_id
      WHERE role = 'Employee' `
    if(custom_date){
      query += `ep.created_at = DATE_FORMAT(${custom_date,'%d-%m-%Y'}) `
    }
    if(limit){
      const offset = (page - 1) * limit;
      query += `LIMIT ${limit} OFFSET ${offset}`
    }
    return model(query)
  }
}