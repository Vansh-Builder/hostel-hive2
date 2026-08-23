import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({ name: String, email: { type: String, unique: true }, password: String, role: String });
const propertySchema = new mongoose.Schema({ name: String, city: String, area: String, college: String, rent: Number, deposit: Number, room: String, gender: String, tags: [String], about: String, images: [String], verified: Boolean, owner: mongoose.Schema.Types.ObjectId }, { timestamps: true });
const User = mongoose.model('User', userSchema); const Property = mongoose.model('Property', propertySchema);
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hostelhive';
const photos = ['photo-1555854877-bab0e564b8d5','photo-1522708323590-d24dbb6b0267','photo-1505693416388-ac5ce068fe85','photo-1560185008-b033106af5c3'].map(id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`);
const records = [
  ['The Courtyard House','Jaipur','Malviya Nagar','MNIT Jaipur',12500,'Single'], ['Mango Tree Living','Jaipur','Vaishali Nagar','Amity University',8500,'Double'], ['Aravali Student Homes','Jaipur','Jagatpura','Manipal University',15000,'Single'], ['Blue City Nest','Jodhpur','Ratanada','JNVU',7200,'Triple'], ['Mehrangarh House','Jodhpur','Paota','IIT Jodhpur',11000,'Double'], ['Suncatcher PG','Jodhpur','Chopasni Road','NIFT Jodhpur',9500,'Single'], ['IIT Heights','Jodhpur','Karwar','IIT Jodhpur',8900,'Double'], ['Blue Fort Residency','Jodhpur','Pal Road','IIT Jodhpur',9800,'Triple'], ['Campus Gate Hostel','Jodhpur','Shikargarh','IIT Jodhpur',11500,'Single'], ['Scholar Square','Jodhpur','Banar Road','IIT Jodhpur',7600,'Double'], ['MNIT Gate PG','Jaipur','Malviya Nagar','MNIT Jaipur',9800,'Double'], ['Campus View Jaipur','Jaipur','Malviya Nagar','MNIT Jaipur',13200,'Single'], ['JECRC Junction','Jaipur','Pratap Nagar','JECRC University',6500,'Double'], ['Manipal Mile Hostel','Jaipur','Jagatpura','Manipal University',9200,'Double'], ['Pink City Girls Hostel','Jaipur','Adarsh Nagar','Rajasthan University',7800,'Double']
];
await mongoose.connect(mongoUri);
await User.deleteMany({});
await Property.deleteMany({});
const admin = await User.create({ name: 'HostelHive Admin', email: process.env.ADMIN_EMAIL || 'admin@hostelhive.in', password: await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@12345', 12), role: 'admin' });
const properties = records.map((record, index) => ({ name: record[0], city: record[1], area: record[2], college: record[3], rent: record[4], deposit: record[4], room: record[5], gender: index % 3 === 0 ? 'Female' : index % 3 === 1 ? 'Male' : 'Unisex', tags: ['Wi-Fi', index % 2 ? 'Security' : 'Food', 'Study table'], about: `Verified student ${record[5].toLowerCase()} sharing hostel near ${record[3]}.`, images: [photos[index % photos.length]], verified: true, owner: admin._id }));
await Property.insertMany(properties);
console.log(`Seeded ${properties.length} properties. Admin: ${admin.email}`);
await mongoose.disconnect();
