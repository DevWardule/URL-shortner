const urlModel = require("../models/url");

const shorten = async (req, res) => {
  console.log(req.body);
  //   console.log("hello");
  const url = req.body.fullUrl;
  const present = await urlModel.findOne({ long: url });
  if (present) {
    present.created_at = Date.now();
    await present.save();
  } else {
    const obj = await urlModel.create({
      long: url,
    });
  }
  //   res.send(obj);
  res.redirect("/");
};

const getAll = async (req, res) => {
  const page = req.page;
  const totalPages = req.totalPages;
  const limit = req.limit;
  const objs = await urlModel
    .find({})
    .sort({ created_at: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.send(objs);
};

module.exports = {
  shorten,
  getAll,
};
