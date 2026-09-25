import moongose from 'mongoose';

const userSchema = new moongose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v: string) =>
        new RegExp(
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.=&-?:]*)*\/?$/,
        ).test(v),
      message: 'Invalid URL format',
    },
    required: true,
  },
});

const User = moongose.model('User', userSchema);

export { User };
