import mongoose , {Schema} from "mongoose";

const attendaceSchema = new Schema({
    fieldAgent: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },

    In: {
        type: Date,
        required: true
    },

    Out: {
        type: Date
    },

    durationMinutes: {
        type: Number,
        default: 0
    },
    checkInImage: {
        type: String,
        required: true
    },
    checkInImagePublicId: {
        type: String,
        required: true
    },

    checkOutImage: {
        type: String
    },
    checkOutImagePublicId: {
        type: String
    },

    checkInLocation: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },

    checkOutLocation: {
        latitude: Number,
        longitude: Number
    }

}, { timestamps: true })

attendaceSchema.index({ fieldAgent: 1, date: 1 },{ unique: true })


attendaceSchema.index({ fieldAgent: 1, In: 1 })

export const Attendance = mongoose.model("Attendance",attendaceSchema)