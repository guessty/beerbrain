const functions = require('firebase-functions')
const next = require('next')
const fetch = require('isomorphic-fetch')
const request = require('request')
const cors = require('cors')({origin: '*'})

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, conf: { distDir: 'next' } })
const handle = app.getRequestHandler()

exports.next = functions.https.onRequest((req, res) => {
  console.log('File: ' + req.originalUrl) // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res))
})

exports.api = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.send({ 'drinks': 'test from cors' })
  })
})

exports.graphQL = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    //res.send({ 'drinks': 'test from cors' })
    const data = {
      query: `query GetAllDrinks {
        viewer {
          allDrinks {
            edges {
              node {
                id
                name
                price
              }
            }
          }
        }
      }`
    }

    request({
      url: "https://us-west-2.api.scaphold.io/graphql/determined-birthday",
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: data
    }, (error, response, body) => {
      console.log(error, response)
      if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(body, null, 2))
        res.status(200).send(response)
      } else {
        console.log(error)
        res.status(500).send({ message: error.message })
      }
    })

    // fetch('https://us-west-2.api.scaphold.io/graphql/determined-birthday', {
    //   method: "POST",
    //   json: true,
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then((response) => {
    //   res.status(200).send(response)
    // })
    // .catch((err) => {
    //   res.status(500).send({ message: err.message })
    // })
  })
})
