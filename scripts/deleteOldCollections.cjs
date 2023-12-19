const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

const db = admin.firestore()

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
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  for (const collection of collections) {
    const sessionStateDoc = await db.collection(collection.id).doc('sessionState').get()
    const lastRevealOn = sessionStateDoc.data().lastRevealOn
    if (lastRevealOn) {
      const date = lastRevealOn.toDate()
      if (date < sixMonthsAgo)
        console.log(`Collection ${collection.id} last revealed on ${date.toISOString()}`)
        // await deleteCollection(db, collection.id, 100);
        // console.log(`Collection ${collection.id} deleted`);
    } 
  }
}

deleteCollectionsBasedOnCondition()
