const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Admin User',
    email: 'admin@dukaan.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Micheal King',
    email: 'micheal@dukaan.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Trevor Sass',
    email: 'trevor@dukaan.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

module.exports = users