import mongoose, { Schema } from "mongoose";

interface IUserSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  projects: string[];
  userSkills: string[];
  bio: string;
  userEducation: string[];
  userExperience: string[];
  projectQuery: string[];
}

const userSchema = new Schema<IUserSchema>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Projects",
      },
    ],
    userSkills: [
      {
        type: Schema.Types.ObjectId,
        ref: "Skills",
      },
    ],
    bio: {
      hobbies: String,
      totalProjects: Number,
      totalExperience: Number,
      about: String,
    },
    userEducation: [
      {
        type: Schema.Types.ObjectId,
        ref: "Education",
      },
    ],
    userExperience: [
      {
        type: Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],
    projectQuery: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProjectQuery",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User ?? mongoose.model("User", userSchema);
export default User;
