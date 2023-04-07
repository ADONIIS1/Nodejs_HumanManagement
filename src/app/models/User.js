const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);


const User = new Schema(
    {
        active: { type: Boolean, default: false },
        birthDay: { type: Date, default: new Date() },
        email: { type: String, unique: true },
        password: { type: String },
        phone: { type: String },
        address: { type: String },
        fullname: { type: String },
        avatar: { type: String },
        username: { type: String, slug: "fullname", unique: true },
        departmentID: { type: Schema.Types.ObjectId, ref: "Department" },
        degreeID: { type: Schema.Types.ObjectId, ref: "Degree" },
        salaryID: { type: Schema.Types.ObjectId, ref: "Salary" },
        roles:[ 
            { 
                type: Schema.Types.ObjectId, 
                ref: "Role" 
            }
        ],
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("User", User);


