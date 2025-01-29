import { Feed } from 'feed'

const basePath = 'https://nurriyad.com'

export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'text/xml')
  const docs = await queryCollection(event, 'blogs').order('date', 'DESC').all()
  const feed = new Feed({
    title: "Riyad's personal blog site",
    description: "Riyad's personal blog site",
    id: basePath,
    link: basePath,
    language: 'en',
    favicon: `${basePath}/favicon.ico`,
    copyright: 'MIT',
    author: {
      name: 'Al Asad Nur Riyad',
      email: 'asadnurriyad@gmail.com',
      link: basePath,
    },
  })

  // Add the feed items
  docs.forEach((doc) => {
    feed.addItem({
      title: doc.title || '',
      id: basePath + doc.path,
      link: basePath + doc.path,
      description: doc.description,
      content: doc.description,
      date: new Date(doc.date as string),
    })
  })

  return feed.rss2()
})
