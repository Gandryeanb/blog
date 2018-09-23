const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  fname:  {
      type :String,
      required : true
  },
  lname: String,
  email: {
      type : String,
      unique : true,
      required : true
  },
  password: {
    type : String,
    required : true,
    validate : {
        validator (val) {
            if (val.length >= 6) {
                return true
            } else {
                return false
            }
        }
    }
  }
},{
    timestamps : true
});

userSchema.post('validate', (doc) => {
    
    doc.password = bcrypt.hashSync(doc.password, Number(process.env.ENCRYPT_HASH));
})

const User = mongoose.model('User', userSchema);

module.exports = User