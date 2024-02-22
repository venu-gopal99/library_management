const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const studentSchema = new mongoose.Schema({
    student_name: {
        type: String,
        required: true,
    },
    student_ID: {
        type: String,
        required: true,
        unique: true
    },
    student_dept: {
        type: String,
        required: true,
    },
    student_phoneNo: {
        type: String,
        required: true,
    },
    student_email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    student_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "librarian"],
        default: "student",
      },
    is_deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

studentSchema.pre("save", async function (next) {
    if (!this.isModified("student_password")) return next;
    this.student_password = await bcrypt.hash(this.student_password, 14);
    next();
});

studentSchema.methods.comparePasswordInDb = async function (pwd, pswDB) {
    return await bcrypt.compare(pwd, pswDB);
};



module.exports = mongoose.model("tbl_student", studentSchema);
