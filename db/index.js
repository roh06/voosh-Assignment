const mongoose = require('mongoose');
const password = encodeURIComponent("Rohan@2000");

mongoose.connect(`mongodb+srv://rohansachan08:${password}@cluster1.3dp46xd.mongodb.net/api-assignment`, {
    useNewURLParser: true,
    useUnifiedTopology: true
});


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    profilePicture: {
        type: String,
        default: ''
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

// const AdminSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     bio: {
//         type: String,
//         default: ''
//     },
//     phone: {
//         type: String,
//         default: ''
//     },
//     profilePicture: {
//         type: String,
//         default: ''
//     },
//     isPublic: {
//         type: Boolean,
//         default: false
//     },
//     role: {
//         type: String,
//         enum: ['user', 'admin'],
//         default: 'user'
//     }
// });

const User = mongoose.model('User',UserSchema);
// const Admin = mongoose.model('Admin', AdminSchema);
module.exports = User;