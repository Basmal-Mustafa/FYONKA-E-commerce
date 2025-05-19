// models/user.model.js
const mongoose = require("mongoose");
const { hashPassword } = require("../utils/hashPassword")


const userSchema = new mongoose.Schema(
    {
        username: {type: String,required: true, trim: true},
        email:    {type: String,required: true,unique: true,match: [/^[\w.%+-]+@[\w.-]+\.[a-z]{2,}$/, "Please use a valid email address"]},
        isActive: {type: Boolean,default: true,},
        password: {type: String,required: true,minlength: 6,},
        role:     {type: String,enum: ["admin", "user"],default: "user",},
        
        orderId:   [{type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
        cartItems: [{type: mongoose.Schema.Types.ObjectId, ref: "Cart"}],
        productId: [{type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    },
    {
        timestamps: true,  // createdAt and updatedAt
    }
);


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await hashPassword(this.password);
        next();
    } catch (err) {
        next(err);
    }
});

//Mongoose  ==> "users" (بـ s)تلقائيًا هيخزن البيانات في مجموعة اسمها 
const User = mongoose.model("User", userSchema);
module.exports = User;


// بصوا دا شرح او ليه دول موجوديين
// User Schema: يعرض بيانات المستخدم مثل العنوان، الطلبات، وسلة المشتريات
// username: بيستخدم كاسم للحساب
// email: بيستخدم عشان تتسجل أو تدخل على الموقع
// isActive: بيحدد إذا كان الحساب شغال أو لأ
// password: بيستخدم ككلمة سر ولازم تتشفر
// role: بيحدد نوع المستخدم (مسؤول أو عادي)
// orders: بيعرض كل الطلبات اللي اتعملت قبل كده --> array zy elly 3mlha albshmhnds fy posts
// cartItems: بيعرض الحاجات اللي في السلة ولسه ما اتشتريتش --> array zy elly 3mlha albshmhnds fy posts

// =====> ref --> هنا بنحط اسم مودل اللي عملته تمام علشان نربطهم
// =====> populate --> hatly altfasyl alkamla llmstnd ally aly objectid byshaor 3lyh

/*
ObjectId
populate: Object, sets default populate options
*/

/*
mongoose.Schema.Types.ObjectId stores a MongoDB ObjectID.
Use the ref option to create a reference to another model (enabling population via populate()).
Useful for creating relationships between collections (like foreign keys in SQL).
*/

/*
Flow Without Checkout:
Add to Cart 
View Cart 
Click “Place Order” → Create order in DB.
Show order success page(Toast) 
Admin can view orders 
*/