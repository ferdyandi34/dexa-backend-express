const { Router } = require('express')
const { listEmployee, presenceEmployee } = require('../controllers/employeeController')

const router = Router()
router.get('/employee', listEmployee)
router.post('/employee/presence', presenceEmployee)

module.exports = router