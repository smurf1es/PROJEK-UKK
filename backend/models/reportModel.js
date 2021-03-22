import mongoose from 'mongoose';
import moment from 'moment';

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isAdmin: {
      type: Boolean,
    },
    isOfficer: {
      type: Boolean,
    },
    username: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    exactCreatedDate: {
      type: String,
      default: moment(Date.now()).format('DD MMM YYYY'),
    },
  },
  { timestamps: true }
);

const reportSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    username: {
      type: String,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    reportStatus: {
      type: Number,
      required: true,
      default: 0,
    },
    exactCreatedDate: {
      type: String,
      default: moment(Date.now()).format('DD MMM YYYY'),
    },
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema);

export default Report;
