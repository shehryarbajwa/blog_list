const blogRouter = require("express").Router();
const Blog = require("../models/blogs.js");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post("/", async (request, response, next) => {

  if(!request.body.title || !request.body.url){
    response.status(400).json({
      error: "missing title or url"
    })
  }

  const blog = new Blog(request.body);

  try {
    const savedBlog = await blog.save();
    response.status(201)
    .json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(`/api/blogs/${request.params.id}`)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const blog = await Blog.findByIdAndUpdate(`/api/blog/${request.params.id}`, newBlog)
    response.json(blog.toJSON())
  } catch (exception){
    next(exception)
  }
})

module.exports = blogRouter;
