require('dotenv').config()

const express = require("express");
const app = express();
const cors = require("cors");
// Enable CORS
app.use(cors({
    origin:"http://localhost:5500",
}));
app.use(express.json());

const stripe = require('stripe')(process.env.
    STRIPE_PRIVATE_KEY);

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Frontend Development" }],
    [2, { priceInCents: 70000, name: "Backend Development " }],
    [3, { priceInCents: 50000, name: "DataBase Management " }],
])
app.post('/create', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const itemData = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: itemData.name
                        },
                        unit_amount: itemData.priceInCents
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `${process.env.CLIENT_URL}/sucess.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`
        })
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})
app.listen(3000, () => {
    console.log("Server is running...")
})
