/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable node/prefer-global/process */

const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

const db = admin.firestore()

// eslint-disable-next-line no-unused-vars
async function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath)
  const query = collectionRef.orderBy('__name__').limit(batchSize)

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject)
  })
}

async function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  query
    .get()
    .then((snapshot) => {
      if (snapshot.size === 0)
        return 0

      const batch = db.batch()
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref)
      })

      return batch.commit().then(() => {
        return snapshot.size
      })
    })
    .then((numDeleted) => {
      if (numDeleted === 0) {
        resolve()
        return
      }

      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject)
      })
    })
    .catch(reject)
}

async function deleteCollectionsBasedOnCondition() {
  const collections = await db.listCollections()
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth())

  for (const collection of collections) {
    if (collection.id === '1111111111111')
      continue
    const sessionStateDoc = await db.collection(collection.id).doc('sessionState').get()
    const lastRevealOn = sessionStateDoc.data().lastRevealOn
    if (lastRevealOn) {
      const date = lastRevealOn.toDate()
      if (date < sixMonthsAgo) {
        console.log(`Collection ${collection.id} LAST REVEALED on ${date.toISOString()}`)
        // await deleteCollection(db, collection.id, 100)
        // console.log(`Collection ${collection.id} deleted\n`)
      }
    }
    else {
      const createdOnDate = sessionStateDoc.data().createdOn.toDate()
      if (createdOnDate < sixMonthsAgo) {
        console.log(`Collection ${collection.id} CREATED on ${createdOnDate.toISOString()}`)
        // await deleteCollection(db, collection.id, 100)
        // console.log(`Collection ${collection.id} deleted\n`)
      }
    }
  }
}

deleteCollectionsBasedOnCondition()
