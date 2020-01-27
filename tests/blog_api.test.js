const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs.js')
const {blogsInDb, initialBlogs} = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

describe('test blog posts', () => {
    test('blogs are returned', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('request returns the correct number of blogs', async () => {
        const blogs = await blogsInDb()
        expect(blogs.length).toBe(2)
    })

    test('blogs have an id property', async () => {
        const blogs = await blogsInDb()
        const id = blogs.map(blog => blog.id)
        expect(id).toBeDefined()
    })

    test('adding a blog', async () => {
        const newBlog = {
            title: 'Shehryar',
            author: 'Bajwa',
            url: 'http://www.facebook.com/shehryarbajwa',
            likes: '12'
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsInDb()
        expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)

        const title = blogsAtEnd.map(blog => blog.title)
        expect(title).toContain('Shehryar')
    })

    test('on a blog if no likes are present, default to null', async () => {
        const newBlog = {
            title: 'Title_',
            author: 'Author_',
            url: 'https://url_testing.com',
            likes: ''
        }

        const savedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        
        expect(savedBlog.body).toHaveProperty('likes')
    })

    test('on a blog if author, title not present get a 400 status code', async () => {
        const newBlog = {
            url: 'https://url_testing.com',
            likes: ''
        }

        const savedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

})


afterAll(() => {
    mongoose.connection.close()
})