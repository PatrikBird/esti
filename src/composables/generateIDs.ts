export function generateID() {
  const newSessionID = Date.now().toString() + Math.floor(1000 + Math.random() * 9000).toString()
  const newUserID = Date.now().toString() + Math.floor(1000 + Math.random() * 9000).toString()
  console.log(newSessionID, newUserID)

  return { newSessionID, newUserID }
}
