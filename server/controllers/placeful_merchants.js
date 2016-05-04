'use strict'
require('dotenv').load()
const collections = ['merchants']
const db = require('mongojs').connect(process.env.DEALSBOX_MONGODB_URL, collections)

module.exports = {
  index: {
    handler: function (request, reply) {
      if (!request.auth.isAuthenticated) {
        return reply.redirect('/login')
      }

      if (!request.auth.credentials.role) {
        reply("<h1>You don't have the permission to access this page</h1>")
      }
      db.merchants.find({ business_id: {
          $nin: ['dv8ySTnrbuB5nEEufY9p', 'pcCxqeV5C5O6OtpEqMhw'] // filter demo and admin places
      } }, function (err, people) {
        if (err) console.log(err)
        reply.view('merchant/merchants.html', {
          merchants: people,
          role: request.auth.credentials.role
        })
      })
    },
    auth: 'session'
  }
}
