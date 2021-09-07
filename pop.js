const mongoose = require("mongoose");

const Teacher = mongoose.model(
  "Teacher",
  new mongoose.Schema({
    name: String,
    major: String,
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: { type: String, required: true },
    location: String,
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  })
);

async function createTeacher(name, major) {
  const teacher = new Teacher({
    name,
    major,
  });
  await teacher.save();
}

async function createCourse(name, location, teacher) {
  const course = new Course({
    name,
    location,
    teacher,
  });
  await course.save();
}

async function listCourse() {
  const courses = await Course.find().select("name");
  console.log(courses);
}

async function updateTeacher(courseId, teacherName) {
  const course = await Course.findById(courseId);
  course.teacher.name = teachername;
  course.save();
}

async function addTeacher(courseId, teacher) {
  const course = await Course.findById(courseId);
  course.teacher.push(teacher);
  course.save();
}

async function removeTeacher(courseId, teacherId) {
  const course = await Course.findById(courseId);
  const teacher = course.teacher._id(teacherId);
  teacher.remove();
  course.save();
}
