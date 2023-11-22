const stripe = require("stripe")("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");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.stripeCheckout = functions.https.onCall(async (data, context) => {
    const {precio} = data;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "cop",
                    product_data: {
                        name: "Apoyo Voluntario",
                        description: "Contribución voluntaria a Joum.",
                        images: ["-"],
                    },
                    unit_amount: Math.round(precio * 100),
                },
                quantity: 1,
            }
        ],
        mode: "payment",
        locale: "es",
        success_url: "https://joum.com.co/quienes-somos?action=success",
        cancel_url: "https://joum.com.co/quienes-somos",
    });
    return session.id;
});