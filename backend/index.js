import express from "express"
import { config } from "dotenv"
config({ path: "./config/config.env" })
import paymentRouter from "./router/paymentRouter.js"
import cors from "cors"
import Razorpay from "razorpay"

const app = express();
app.use(cors({
    origin: '*', // Allow all domains (or specify specific domains for tighter security)
    methods: 'GET,POST', // Methods allowed
    allowedHeaders: 'Content-Type,Authorization'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


export const razorInstance = new Razorpay({
    key_id: process.env.RAZORPAY_key,
    key_secret: process.env.RAZORPAY_SECRET,
})

app.use("/", paymentRouter)



app.listen(process.env.PORT, () => {
    console.log(`server started ${process.env.PORT}`)
})


