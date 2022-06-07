
import { connectToDatabase } from "../../lib/mongoDb"
const ObjectId = require('mongodb').ObjectId

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getMLB(req, res)
    }
  }
}

async function getMLB(req, res) {
  let allPosts = {
    scheduled: [],
    finished: [],
    upcoming: [],
    inProgress: []
  }
  try {

    // connect to the database
    let { db } = await connectToDatabase()

    // fetch the scheduled posts
    let scheduled = await db
      .collection('mlb_scheduled')
      .find({})
      .toArray()
    allPosts.scheduled.push(scheduled)

    // fetch the finished posts
    let finished = await db
      .collection('mlb_finished')
      .find({})
      .toArray()
    allPosts.finished.push(finished)

    // fetch the upcoming posts
    let upcoming = await db
      .collection('mlb_upcoming')
      .find({})
      .toArray()
    allPosts.upcoming.push(upcoming)

    // fetch the scheduled posts
    let inProgress = await db
      .collection('mlb_inProgress')
      .find({})
      .toArray()
      allPosts.inProgress.push(inProgress)

    return res.json({
      scheduled: JSON.parse(JSON.stringify(allPosts.scheduled)),
      finished: JSON.parse(JSON.stringify(allPosts.finished)),
      upcoming: JSON.parse(JSON.stringify(allPosts.upcoming)),
		inProgress: JSON.parse(JSON.stringify(allPosts.inProgress)),
      success: true,
    })
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}