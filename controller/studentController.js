const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

router.get("/", (req, res) => {
  res.render("student/addOrEdit", {
    viewTitle: "Insert Student",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

function insertRecord(req, res) {
  var student = new Student(),
    postData = req.body;
  student.fullName = postData.fullName;
  student.email = postData.email;
  student.mobile = postData.mobile;
  student.city = postData.city;
  student.save((err, doc) => {
    if (!err) {
      res.redirect("student/list");
    } else {
      console.log("Error during insert: ", err);
    }
  });
}

function updateRecord(req, res) {
  const postData = req.body;
  Student.findByIdAndUpdate(
    { _id: postData._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("student/list");
      } else {
        console.log("Error during update: ", err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  Student.find((err, docs) => {
    if (!err) {
      res.render("student/list", {
        list: docs,
      });
    } else {
      console.log("Error in retrieval: ", err);
    }
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Student.findById(id, (err, doc) => {
    if (!err) {
      res.render("student/addOrEdit", {
        viewTitle: "Update Student",
        student: doc,
      });
      console.log(doc);
    } else {
      console.log(err);
    }
  });
});

router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  Student.findByIdAndRemove(id, (err, docs) => {
    if (!err) {
      res.redirect("/student/list");
    } else {
      console.log("Error in deletion: ", err);
    }
  });
});

module.exports = router;
