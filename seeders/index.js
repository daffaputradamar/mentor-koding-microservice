const seeder = require('mongoose-seed')
const bcrypt = require('bcryptjs')

function createHash(password) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

const data = [
  {
    model: 'User',
    documents: [
      {
        _id: '5bfd1ca5b5a8252d542411d6',
        username: 'mnindrazaka',
        name: 'm nindra zaka',
        password: createHash('mnindrazaka'),
        address: 'malang',
        phone: '085331247098'
      },
      {
        _id: '5bfd1ca5b5a8252d542411d5',
        username: 'herlina',
        name: 'herlina',
        password: createHash('herlina'),
        address: 'malang',
        phone: '085331247098',
        isMentor: true
      }
    ]
  }
]

seeder.connect(
  'mongodb://mentorkoding:mentork0ding@ds159110.mlab.com:59110/mentor-koding-users',
  () => {
    seeder.loadModels(['models/User.js'])
    seeder.clearModels(['User'], () => {
      seeder.populateModels(data, () => {
        console.log('Populate success')
      })
    })
  }
)
