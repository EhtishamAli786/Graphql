import { authenticateToken } from "../utils";
const express = require("express");
const { ArticleModel } = require("../models");
let router = express.Router();

router.get("/one", authenticateToken, function (req, res) {
  const { articleId } = req.query;
  if (!articleId) {
    return res.status(201).send({ message: "Article not found" });
  }
  ArticleModel.find({ _id: articleId }, function (err, article) {
    if (!err) {
      return res.status(200).send({ res: article });
    }
    return res.status(201).send("Failed to get single article");
  });
});

router.get("/all", authenticateToken, function (req, res) {
  ArticleModel.find({}, function (err, articles) {
    if (!err) {
      return res.status(200).send({ res: articles });
    }
    return res.status(201).send("Failed to get all articles");
  });
});
router.post("/create", authenticateToken, function (req, res) {
  const { title, minRead, description, featuredImage, footerLinks } = req.body;
  const { userId } = req;
  if (!title || !minRead || !description || !featuredImage) {
    return res.status(201).send({ message: "Incomplete Details" });
  }
  const newArticle = new ArticleModel({
    title,
    minRead,
    description,
    featuredImage,
    footerLinks: footerLinks || [],
    userId,
  });
  newArticle.save(function (err) {
    if (err) {
      return res.status(201).send({ message: "Article creation failed", err });
    }
    return res.status(200).send("Article Created Successfully");
  });
});

router.post("/delete", authenticateToken, function (req, res) {
  const { articleId } = req.body;
  if (!articleId) {
    return res.status(201).send({ message: "Article not found" });
  }
  ArticleModel.findByIdAndDelete(articleId, function (err) {
    if (err) {
      return res.status(201).send({ message: "Article deletion failed", err });
    }
    return res.status(200).send("Article Deleted Successfully");
  });
});

router.post("/update", authenticateToken, function (req, res) {
  const {
    articleId,
    title,
    minRead,
    description,
    featuredImage,
    footerLinks,
  } = req.body;

  if (!articleId) {
    res.status(201).send({ message: "Article not found" });
    return;
  }
  const obj = {};
  if (title) obj.title = title;
  if (minRead) obj.minRead = minRead;
  if (description) obj.description = description;
  if (featuredImage) obj.featuredImage = featuredImage;
  if (footerLinks) obj.footerLinks = footerLinks;

  ArticleModel.findByIdAndUpdate(
    articleId,
    { ...obj },
    { new: true },
    (err, article) => {
      console.log("err, article", err, article);
      if (err) return res.status(201).send(err);
      return res.status(200).send(article);
    }
  );
});
export const articleroute = router;
