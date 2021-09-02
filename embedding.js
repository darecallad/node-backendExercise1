const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // const course = await Course.findById(courseId);
  // course.author.name = "mosh hamedani";
  // course.save();
  // or
  const course = await Course.update(
    { _id: courseId },
    {
      $set: {
        //unset
        "author.name": "John Smith",
      },
    }
  );
}
async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}
// updateAuthor("613002c1cf7c8d175536480f");
// createCourse("Node Course", [
//   new Author({ name: "Mosh" }, new Author({ name: "John" })),
// ]);

addAuthor("", new Author({ name: "Annie" }));

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors._id(authorId);
  author.remove();
  course.save();
}
