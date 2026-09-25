import moongose from 'mongoose';

const cardSchema = new moongose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
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
  owner: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [
    {
      type: moongose.Schema.Types.ObjectId,
      ref: 'User',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = moongose.model('Card', cardSchema);

export { Card };
