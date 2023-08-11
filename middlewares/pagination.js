const urlModel = require("../models/url");

const paginate = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const totalDocs = await urlModel.countDocuments();
  const totalPages = Math.ceil(totalDocs / limit);
  req.page = page;
  req.totalPages = totalPages;
  req.limit = limit;
//   console.log(page);
//   console.log(limit);
//   console.log(totalDocs);
//   console.log(totalPages);
  next();
};

module.exports = paginate;
