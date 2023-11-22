const functions = require("firebase-functions");

const clientId = "AeMsb_MDab11J4CTafGH6UDzazbyJNMdi30_P3nj-_U9FA4GZkvz8rtnsj2Ll4I7IdYi_zuIbKibvedu";
const secretKey = "EICexjOJeMsKwz44vn2LIwTy5euFUHoIPe1ws6IbjNv4AmlEqxsr3aVGtS-P96IgJmqRpGjFVCD-mC8h";
const paypal = require("@paypal/checkout-server-sdk");
const env = new paypal.core.LiveEnvironment(clientId, secretKey);
const client = new paypal.core.PayPalHttpClient(env);
const request = new paypal.orders.OrdersCreateRequest();

exports.payCheckout = functions.https.onCall(async (data, context) => {
  request.requestBody({
    "intent": "CAPTURE",
    "purchase_units": [
      {
        "amount": {
          "currency_code": "USD",
          "value": "0.8",
        },
      },
    ],
  });

  const response = await client.execute(request);

  return response.result;
});
