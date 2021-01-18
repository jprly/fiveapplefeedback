exports.handler = async (event) => {
  var faunadb = require("faunadb"),
    q = faunadb.query;
  var adminClient = new faunadb.Client({
    secret: `${process.env.FAUNA_SERVER_KEY}`,
  });

  var serverClient = new faunadb.Client({
    secret: `${process.env.FAUNA_SERVER_KEY}`,
  });

  const feedbackMatch = serverClient
    .query(q.Get(q.Match(q.Index("fb"), "NVGC-L2-U4-LC1-2")))

    .then((ret) => console.log(ret));

  return {
    statusCode: 200,
    body: `Hello ${feedbackMatch}!`,
  };
};
