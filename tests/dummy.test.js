const {dummy, totalLikes, favoriteBlog} = require('../utils/for_testing')

describe('Testing', () => {
    test('Multiple array elements', () => {
        expect(dummy([1,2,3])).toBe(1) 
    })

    test('Check array with unique values', () => {
        expect(dummy([1,4,5])).toBe(1)
    })
})

describe('total likes', () => {
    test('of empty list is 0', () => {
        const emptyListofBlogs = []

        const result = totalLikes(emptyListofBlogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that blog', () => {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
              }
        ]

        const result = totalLikes(listWithOneBlog);
        expect(result).toBe(5)
    })

    test('list has multiple blogs', () => {
        const listwithmultipleblogs = [
            {
                _id: '5a422aa71b04a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0

            },
            {
                _id: '5a422aa71b54a626234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d16f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 15,
                __v: 0
            }
        ]

        const result = totalLikes(listwithmultipleblogs)
        expect(result).toBe(30)
    })


})

describe('favorite blogs', () => {
    test('which blog has most likes', () => {
        const listwithmultipleblogs = [
            {
                _id: '5a422aa71b04a676234d17f8',
                title: 'Ride sharing longevity',
                author: 'Matthew Francesco',
                url: 'http://www.ubc.ca/blog.html',
                likes: 5,
                __v: 0

            },
            {
                _id: '5a422aa71b54a626234d17f8',
                title: 'Effects of radiation',
                author: 'Peougot Francesco',
                url: 'http://www.ryerson.edu/blog.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d16f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Karl Mithchell',
                url: 'http://www.mcgill.ca/blog.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Facebook graph and consequences',
                author: 'Alphonso Mark',
                url: 'http://www.uoft.ca/blog.html',
                likes: 15,
                __v: 0
            }
        ]

        const result = favoriteBlog(listwithmultipleblogs)
        expect(result).toEqual({"author": "Alphonso Mark", "likes": 15, "title": "Facebook graph and consequences"})
    })
})


