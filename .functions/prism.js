const prism = require("@stoplight/prism-http/dist/client");

const c = prism.createClientFromResource(
  "https://raw.githack.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml",
  { mock: { dynamic: true } }
);
const baseUrl = "/.netlify/functions/prism";

exports.handler = async function (event, context, callback) {
  const client = await c;
  const response = await client.request(event.path.replace(baseUrl, ""), {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body
  });

  callback(undefined, {
    statusCode: response.status,
    headers: response.headers,
    body: JSON.stringify(response.data)
  });
};
