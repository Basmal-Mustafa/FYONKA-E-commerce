// utils/hashedPassword
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword); 
};


module.exports = { hashPassword, comparePassword };

/*
تشفير كلمة السر قبل تخزينها في قاعدة البيانات
التحقق منها وقت تسجيل الدخول
*/