const prism = require("@stoplight/prism-http/dist/client");
const resources = require("./resources.json");
const client = prism.createClientFromOperations(resources, { mock: { dynamic: true } });

const baseUrl = "/.netlify/functions/prism";

exports.handler = async function (event, context, callback) {
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
