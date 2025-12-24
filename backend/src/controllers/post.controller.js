import { Post } from "../model/Post.js";
import { cloudinary } from "../libs/cloudnary.js";
import extractHashtags from "../libs/extractHashtags.js";
import streamifier from "streamifier";

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const isVideo = file.mimetype.startsWith("video/");

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "posts",
        resource_type: isVideo ? "video" : "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({
          url: result.secure_url,
          type: isVideo ? "video" : "image",
        });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};


export const uploadPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { caption } = req.body;

    if (!caption) {
      return res.status(400).json({ success: false, message: "Caption required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "Media required" });
    }

    if (req.files.length > 10) {
      return res.status(400).json({ success: false, message: "Max 10 media allowed" });
    }

    const media = await Promise.all(
      req.files.map(file => uploadToCloudinary(file))
    );

    const post = await Post.create({
      user: userId,
      caption,
      hashtags: extractHashtags(caption),
      media, // [{ url, type }]
    });

    res.status(201).json({
      success: true,
      message: "Post uploaded",
      post,
    });

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const allPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      posts,
      page,
    });

  } catch (err) {
    console.error("All post error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
