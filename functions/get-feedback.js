const { faunaFetch } = require("./utils/fauna");

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);

  // store the Netlify and Stripe IDs in Fauna
  const feedbackResult = await faunaFetch({
    query: `
    Map(
        Paginate(
          Match(Index("fb_by_title"), "NVGC-L2-U4-LC1-2")
        ),
        Lambda(
          "feedback",
          Get(Var("feedback"))
        )
      )
    `,
    variables: {
      netlifyID: user.id,
      stripeID: customer.id,
    },
  });

  console.log(feedbackResult);

  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        feedback: feedbackResult,
      },
    }),
  };
};
