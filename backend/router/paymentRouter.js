import express from "express"
const router = express.Router()
import { razorInstance } from "../index.js"

router.route("/").get((req, res) => {
    res.status(200).send({
        success: true,
        mgs: "hello"
    })
})

router.get("/getkey", (req, res) => {
    res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_key
    })

})
router.post("/checkout", async (req, res) => {
    const options = {
        amount: 50000,
        currency: "INR"
    }

    const order = await razorInstance.orders.create(options)
    res.status(200).json({
        success: true,
        order
    })
})

router.post("/verify-payment", (req, res) => {
    res.send('world')
})

export default router;