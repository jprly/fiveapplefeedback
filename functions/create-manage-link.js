const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');

exports.handler = async (_event, context) => {
  console.log('😂event',_event)
  console.log('hi')
  const { user } = context.clientContext;
  console.log('🙈',user)
  const result = await faunaFetch({
    query: `
      query ($netlifyID: ID!) {
        getUserByNetlifyID(netlifyID: $netlifyID) {
          stripeID
        }
      }
    `,
    variables: {
      netlifyID: user.sub,
    },
  });
console.log('😬',result)
  const { stripeID } = result.data.getUserByNetlifyID;

  const link = await stripe.billingPortal.sessions.create({
    customer: stripeID,
    return_url: process.env.URL,
  });
  console.log('🔗',link);

  return {
    statusCode: 200,
    body: JSON.stringify(link.url),
  };
};
