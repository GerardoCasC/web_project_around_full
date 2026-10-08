import moongose from 'mongoose';

const userSchema = new moongose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v: string) =>
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.=&-?:]*)*\/?$/.test(v),
      message: 'Invalid URL format',
    },
    required: true,
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/web-lat/avatar.jpg',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) =>
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const User = moongose.model('User', userSchema);

export { User };
