import asyncHandler from 'express-async-handler';
import Report from '../models/reportModel.js';
import User from '../models/userModel.js';

// @desc Fetch all reports
// @route GET /api/reports
// @access Private
const getReports = asyncHandler(async (req, res) => {
  const reports = await Report.find().sort({ createdAt: -1 });
  res.json(reports);
});

// @desc Fetch a single report
// @route GET /api/reports/:id
// @access Private
const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (report) {
    res.json(report);
  } else {
    res.status(404);
    throw new Error('Report not found');
  }
});

// @desc Create a single report
// @route POST /api/reports
// @access Private
const createReport = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  const report = await Report.create({
    user: req.user.id,
    username: user.username,
    name: user.name,
    avatar: user.avatar,
    image: req.body.image,
    description: req.body.description,
    reportStatus: 0,
  });

  const createdReport = await report.save();
  res.status(201).json(createdReport);
});

// @desc Update a single report
// @route PUT /api/reports/:id
// @access Private
const updateReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error('Report not found');
  }

  if (report && report.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  } else {
    report.image = req.body.image;
    report.description = req.body.description;

    const updatedReport = await report.save();
    res.json(updatedReport);
  }
});

// @desc Delete a single report
// @route DELETE /api/reports/:id
// @access Private
const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error('Report not found');
  }

  if (report && report.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  } else {
    await report.remove();
    res.json({ message: 'Report removed' });
  }
});

// @desc Set report to being processed
// @route PUT /api/reports/:id
// @access Private/Officer || Private/Admin
const setReportToBeingProcessed = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (report) {
    report.reportStatus = 1;

    const updatedReport = await report.save();
    res.json(updatedReport);
  } else {
    res.status(404);
    throw new Error('Report not found');
  }
});

// @desc Set report to done
// @route PUT /api/reports/:id
// @access Private/Officer || Private/Admin
const setReportToDone = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (report) {
    report.reportStatus = 2;

    const updatedReport = await report.save();
    res.json(updatedReport);
  } else {
    res.status(404);
    throw new Error('Report not found');
  }
});

// @desc Create a report's comment
// @route POST /api/reports/comment/:id
// @access Private
const createComment = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  const report = await Report.findById(req.params.id);
  const comment = {
    text: req.body.text,
    isAdmin: user.isAdmin,
    isOfficer: user.isOfficer,
    username: user.username,
    avatar: user.avatar,
    user: req.user.id,
  };

  if (report) {
    report.comments.unshift(comment);
    await report.save();

    res.json(report.comments);
  } else {
    res.status(404);
    throw new Error('Report not found');
  }
});

// @desc Delete a report's comment
// @route DELETE /api/reports/comment/:id
// @access Private
const deleteComment = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  const comment = report.comments.find(
    (comment) => comment.id === req.params.comment_id
  );

  if (!comment) {
    return res.status(404).json({ message: 'Comment does not exist' });
  }

  if (comment && comment.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  const removeIndex = report.comments
    .map((comment) => comment.user)
    .indexOf(req.user.id);

  report.comments.splice(removeIndex, 1);

  await report.save();
  res.json(report.comments);
});

export {
  getReports,
  getReportById,
  createReport,
  createComment,
  deleteComment,
  updateReport,
  deleteReport,
  setReportToBeingProcessed,
  setReportToDone,
};
