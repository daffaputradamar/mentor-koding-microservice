const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/', userController.index)
router.get('/:_id', userController.show)
router.post('/', userController.store)
router.put('/:_id', userController.update)
router.delete('/:_id', userController.destroy)

module.exports = router
