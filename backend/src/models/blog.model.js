import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      minlength: 5,
      maxlength: 150,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "content is required"],
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    featuredImage: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    readTime: {
      type: Number,
      default: 0,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views:{
      type:Number,
      default:0
    }
  },
  {
    timestamps: true,
  },
);


blogSchema.index({
    title:"text",
    content:"text"
})

blogSchema.index({
    category:1
})

blogSchema.index({
    author:1
})

blogSchema.index({
    status:1
})

export const Blog = mongoose.model("Blog", blogSchema);
