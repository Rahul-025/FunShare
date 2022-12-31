const express = require("express");
const router = express.Router();

const FileModel = require("../models/file-model");

router.get("/", (req, res) => res.render("home"));

/*
 *  @ method  GET
 *  @ route   http://domain/files/fileId
 */

router.get("/files/:fileId", async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.fileId);
    if (!file) {
      return res.status(400).render("download", {
        success: false,
        message: "File link has expired! Please try again.",
      });
    }

    return res.status(200).render("download", {
      success: true,
      fileId: file._id,
      fileName: file.name,
      size: `${file.size / 1000} Kb `,
      downloadLink: `${process.env.API_URL}/api/files/download/${file._id}`,
    });
  } catch (error) {
    return res.status(500).render("download", {
      success: false,
      message: "Something went wrong!",
    });
  }
});

module.exports = router;
