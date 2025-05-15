import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    type: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, default: "pending" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },

});

const Booking = mongoose.model("booking", bookingSchema);

export default Booking;