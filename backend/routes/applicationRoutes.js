const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");
const Job = require("../models/Job");
const Application = require("../models/Application");

// === Multer config for resume uploads ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes"); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// === Apply to Job (Employee Only) ===
router.post(
  "/:jobId",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (req.user.role !== "employee") {
        return res.status(403).json({ message: "Only employees can apply" });
      }

      const { jobId } = req.params;
      const applicantId = req.user.id;

      // Find job
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      // ✅ Prevent duplicate applications
      const existingApp = await Application.findOne({ jobId, applicantId });
      if (existingApp) {
        return res
          .status(400)
          .json({ message: "You already applied for this job" });
      }

      // Create application
      const application = new Application({
        jobId,
        applicantId,
        employerId: job.employerId,
        status: "Pending",
        coverLetter: req.body.coverLetter || "",
        expectedSalary: req.body.expectedSalary || "",
        resume: req.file ? req.file.filename : null,
      });

      await application.save();
      res.status(201).json(application);
    } catch (err) {
      console.error("Error submitting application:", err.message);
      res.status(500).json({ message: "Error submitting application" });
    }
  }
);

// === Get employee's applications (Employee Only) ===
router.get("/employee", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "employee") {
      return res.status(403).json({ message: "Only employees can view this" });
    }

    const applications = await Application.find({ applicantId: req.user.id })
      .populate("jobId", "title company")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error("Error fetching employee applications:", err.message);
    res.status(500).json({ message: "Error fetching applications" });
  }
});

// === Get employer's applications (Employer Only) ===
router.get("/employer", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can view this" });
    }

    const applications = await Application.find({ employerId: req.user.id })
      .populate("jobId", "title company")
      .populate("applicantId", "name email")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error("Error fetching employer applications:", err.message);
    res.status(500).json({ message: "Error fetching applications" });
  }
});

// === Update application status (Employer Only) ===
router.patch("/:appId/status", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can update status" });
    }

    const { appId } = req.params;
    const { status } = req.body;

    if (!["Accepted", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findOneAndUpdate(
      { _id: appId, employerId: req.user.id },
      { status },
      { new: true }
    )
      .populate("jobId", "title company")
      .populate("applicantId", "name email");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    console.error("Error updating application status:", err.message);
    res.status(500).json({ message: "Error updating application status" });
  }
});

// === Update application status ===
router.patch("/:appId/status", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can update status" });
    }

    const { appId } = req.params;
    const { status } = req.body;

    if (!["Accepted", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findOneAndUpdate(
      { _id: appId, employerId: req.user.id }, // ensure employer owns it
      { status },
      { new: true }
    )
      .populate("jobId", "title company")
      .populate("applicantId", "name email");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    console.error("Error updating application status:", err.message);
    res.status(500).json({ message: "Error updating application status" });
  }
});


module.exports = router;
