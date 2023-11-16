import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

const employeeSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            lowercase: true
        },
        address: {
            street:{
                type: String,
                required: true
            },
            postalCode:{
                type: String,
                required: true
            },
            city:{
                type: String,
                required: true
            },
            province:{
                type: String,
                required: true
            }
        },
        role:{
            type: String,
            required: true
        },
        experience: Number,
        startDate:{
            type: Date,
            required: true
        },
        employmentType:{
            type: String,
            required: true
        },
        status:{
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        refreshToken: String
    }
);
employeeSchema.pre("save", function(next) {
    const emp = this;

    if(!emp.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(emp.password, salt, function(err, hash){
            if(err) return next(err);

            emp.password = hash;
            next()
        });
    });
});

employeeSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};


export const Employee = mongoose.model('Employee', employeeSchema);