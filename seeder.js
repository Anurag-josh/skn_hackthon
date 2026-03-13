const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Marketplace = require('./models/marketplace'); // <-- IMPORTANT: Make sure this path is correct!

// Load environment variables from .env file
dotenv.config();

// Data for Maharashtra markets with dates set to 10/10/2025
const maharashtraMarketData = [
  {
    commodity: "Arhar (Tur/Red Gram)(Whole)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Karjat",
    arrival_date: "10/10/2025",
    min_price: "6000",
    max_price: "6000",
    modal_price: "6000"
  },
  {
    commodity: "Brinjal",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "1400",
    max_price: "7100",
    modal_price: "4200"
  },
  {
    commodity: "Cauliflower",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "500",
    max_price: "1000",
    modal_price: "750"
  },
  {
    commodity: "Coriander(Leaves)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "9",
    max_price: "25",
    modal_price: "17"
  },
  {
    commodity: "Garlic",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "4000",
    max_price: "6000",
    modal_price: "5000"
  },
  {
    commodity: "Green Chilli",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "4000",
    modal_price: "3500"
  },
  {
    commodity: "Bitter gourd",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "4000",
    modal_price: "3500"
  },
  {
    commodity: "Cucumbar(Kheera)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "1200",
    max_price: "1500",
    modal_price: "1350"
  },
  {
    commodity: "Tomato",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "1200",
    max_price: "1500",
    modal_price: "1350"
  },
  {
    commodity: "Brinjal",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "4500",
    max_price: "5500",
    modal_price: "5000"
  },
  {
    commodity: "Lime",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "2000",
    max_price: "2500",
    modal_price: "2200"
  },
  {
    commodity: "Little gourd (Kundru)",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "3000",
    modal_price: "3000"
  },
  {
    commodity: "Onion",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "900",
    max_price: "1200",
    modal_price: "1000"
  },
  {
    commodity: "Potato",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "1500",
    max_price: "2000",
    modal_price: "1800"
  },
  {
    commodity: "Spinach",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "4000",
    max_price: "4000",
    modal_price: "4000"
  },
  {
    commodity: "Maize",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Jalgaon(Masawat)",
    arrival_date: "10/10/2025",
    min_price: "1375",
    max_price: "1375",
    modal_price: "1375"
  },
  {
    commodity: "Soyabean",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Jalgaon(Masawat)",
    arrival_date: "10/10/2025",
    min_price: "3500",
    max_price: "3500",
    modal_price: "3500"
  },
  {
    commodity: "Ginger(Green)",
    state: "Maharashtra",
    district: "Mumbai",
    market: "Mumbai",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "7000",
    modal_price: "5000"
  },
  {
    commodity: "Cauliflower",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "3540",
    max_price: "4040",
    modal_price: "3790"
  },
  {
    commodity: "Methi(Leaves)",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "9060",
    max_price: "10050",
    modal_price: "9550"
  },
  {
    commodity: "Orange",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "2520",
    max_price: "3022",
    modal_price: "2771"
  },
  {
    commodity: "Chilly Capsicum",
    state: "Maharashtra",
    district: "Pune",
    market: "Khed(Chakan)",
    arrival_date: "10/10/2025",
    min_price: "4000",
    max_price: "6000",
    modal_price: "5000"
  },
  {
    commodity: "Methi(Leaves)",
    state: "Maharashtra",
    district: "Pune",
    market: "Khed(Chakan)",
    arrival_date: "10/10/2025",
    min_price: "2000",
    max_price: "3000",
    modal_price: "2500"
  },
  {
    commodity: "Lime",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune",
    arrival_date: "10/10/2025",
    min_price: "600",
    max_price: "3600",
    modal_price: "2100"
  },
  {
    commodity: "Banana",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "1500",
    max_price: "7000",
    modal_price: "4250"
  },
  {
    commodity: "Carrot",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "4000",
    modal_price: "3500"
  },
  {
    commodity: "Coriander(Leaves)",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "20",
    max_price: "25",
    modal_price: "23"
  },
  {
    commodity: "Lime",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "4000",
    modal_price: "3500"
  },
  {
    commodity: "Pear(Marasebu)",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "8000",
    max_price: "8000",
    modal_price: "8000"
  },
  {
    commodity: "Ridgeguard(Tori)",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "5000",
    max_price: "6000",
    modal_price: "5500"
  },
  {
    commodity: "Seetapal",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "5000",
    max_price: "5000",
    modal_price: "5000"
  },
  {
    commodity: "Tomato",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "2000",
    modal_price: "1500"
  },
  {
    commodity: "Cabbage",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Pimpri)",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "1500",
    modal_price: "1250"
  },
  {
    commodity: "Cauliflower",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Pimpri)",
    arrival_date: "10/10/2025",
    min_price: "1500",
    max_price: "2000",
    modal_price: "1750"
  },
  {
    commodity: "Garlic",
    state: "Maharashtra",
    district: "Sangli",
    market: "Sangli(Phale, Bhajipura Market)",
    arrival_date: "10/10/2025",
    min_price: "4000",
    max_price: "8000",
    modal_price: "6000"
  },
  {
    commodity: "Onion",
    state: "Maharashtra",
    district: "Sangli",
    market: "Sangli(Phale, Bhajipura Market)",
    arrival_date: "10/10/2025",
    min_price: "500",
    max_price: "1650",
    modal_price: "1075"
  },
  {
    commodity: "Tomato",
    state: "Maharashtra",
    district: "Satara",
    market: "Patan",
    arrival_date: "10/10/2025",
    min_price: "1050",
    max_price: "1250",
    modal_price: "1150"
  },
  {
    commodity: "Bengal Gram(Gram)(Whole)",
    state: "Maharashtra",
    district: "Thane",
    market: "Kalyan",
    arrival_date: "10/10/2025",
    min_price: "6500",
    max_price: "7000",
    modal_price: "6750"
  },
  {
    commodity: "Green Peas",
    state: "Maharashtra",
    district: "Thane",
    market: "Kalyan",
    arrival_date: "10/10/2025",
    min_price: "9000",
    max_price: "12000",
    modal_price: "10500"
  },
  {
    commodity: "Mataki",
    state: "Maharashtra",
    district: "Thane",
    market: "Kalyan",
    arrival_date: "10/10/2025",
    min_price: "6500",
    max_price: "11500",
    modal_price: "9000"
  },
  {
    commodity: "Rice",
    state: "Maharashtra",
    district: "Thane",
    market: "Palghar",
    arrival_date: "10/10/2025",
    min_price: "4601",
    max_price: "4601",
    modal_price: "4601"
  },
  {
    commodity: "Wheat",
    state: "Maharashtra",
    district: "Thane",
    market: "Palghar",
    arrival_date: "10/10/2025",
    min_price: "3355",
    max_price: "3355",
    modal_price: "3355"
  },
  {
    commodity: "Bajra(Pearl Millet/Cumbu)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Karjat",
    arrival_date: "10/10/2025",
    min_price: "2800",
    max_price: "2800",
    modal_price: "2800"
  },
  {
    commodity: "Bajra(Pearl Millet/Cumbu)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Karjat",
    arrival_date: "10/10/2025",
    min_price: "2300",
    max_price: "2300",
    modal_price: "2300"
  },
  {
    commodity: "Bengal Gram(Gram)(Whole)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Karjat",
    arrival_date: "10/10/2025",
    min_price: "5500",
    max_price: "5500",
    modal_price: "5500"
  },
  {
    commodity: "Black Gram (Urd Beans)(Whole)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Karjat",
    arrival_date: "10/10/2025",
    min_price: "4000",
    max_price: "6000",
    modal_price: "5400"
  },
  {
    commodity: "Green Gram (Moong)(Whole)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Karjat",
    arrival_date: "10/10/2025",
    min_price: "6500",
    max_price: "6500",
    modal_price: "6500"
  },
  {
    commodity: "Maize",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Karjat",
    arrival_date: "10/10/2025",
    min_price: "1600",
    max_price: "2200",
    modal_price: "2000"
  },
  {
    commodity: "Maize",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Karjat(Rashin)",
    arrival_date: "10/10/2025",
    min_price: "1500",
    max_price: "2200",
    modal_price: "2000"
  },
  {
    commodity: "Beetroot",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "2500",
    max_price: "2500",
    modal_price: "2500"
  },
  {
    commodity: "Bhindi(Ladies Finger)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "3500",
    modal_price: "3200"
  },
  {
    commodity: "Chilly Capsicum",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "6100",
    modal_price: "4550"
  },
  {
    commodity: "Ridgeguard(Tori)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "5000",
    max_price: "7000",
    modal_price: "6000"
  },
  {
    commodity: "Cauliflower",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "1500",
    max_price: "2000",
    modal_price: "1750"
  },
  {
    commodity: "Ginger(Green)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "2000",
    max_price: "3000",
    modal_price: "2500"
  },
  {
    commodity: "Pomegranate",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "2000",
    max_price: "3000",
    modal_price: "2500"
  },
  {
    commodity: "Cucumbar(Kheera)",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "1500",
    max_price: "2000",
    modal_price: "1800"
  },
  {
    commodity: "Ridgeguard(Tori)",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "3000",
    modal_price: "3000"
  },
  {
    commodity: "Bengal Gram(Gram)(Whole)",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Jalgaon(Masawat)",
    arrival_date: "10/10/2025",
    min_price: "5400",
    max_price: "5400",
    modal_price: "5400"
  },
  {
    commodity: "Bhindi(Ladies Finger)",
    state: "Maharashtra",
    district: "Mumbai",
    market: "Mumbai",
    arrival_date: "10/10/2025",
    min_price: "5000",
    max_price: "6000",
    modal_price: "5500"
  },
  {
    commodity: "Bitter gourd",
    state: "Maharashtra",
    district: "Mumbai",
    market: "Mumbai",
    arrival_date: "10/10/2025",
    min_price: "1800",
    max_price: "2400",
    modal_price: "2100"
  },
  {
    commodity: "Bottle gourd",
    state: "Maharashtra",
    district: "Mumbai",
    market: "Mumbai",
    arrival_date: "10/10/2025",
    min_price: "2000",
    max_price: "2800",
    modal_price: "2400"
  },
  {
    commodity: "French Beans (Frasbean)",
    state: "Maharashtra",
    district: "Mumbai",
    market: "Mumbai",
    arrival_date: "10/10/2025",
    min_price: "3400",
    max_price: "4000",
    modal_price: "3700"
  },
  {
    commodity: "Mango (Raw-Ripe)",
    state: "Maharashtra",
    district: "Mumbai",
    market: "Mumbai",
    arrival_date: "10/10/2025",
    min_price: "6000",
    max_price: "7000",
    modal_price: "6500"
  },
  {
    commodity: "Onion Green",
    state: "Maharashtra",
    district: "Mumbai",
    market: "Mumbai",
    arrival_date: "10/10/2025",
    min_price: "600",
    max_price: "1200",
    modal_price: "900"
  },
  {
    commodity: "Coriander(Leaves)",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kalmeshwar",
    arrival_date: "10/10/2025",
    min_price: "5030",
    max_price: "5500",
    modal_price: "5350"
  },
  {
    commodity: "Raddish",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kalmeshwar",
    arrival_date: "10/10/2025",
    min_price: "1540",
    max_price: "2000",
    modal_price: "1820"
  },
  {
    commodity: "Brinjal",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "2520",
    max_price: "3020",
    modal_price: "2770"
  },
  {
    commodity: "Potato",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "2060",
    max_price: "2560",
    modal_price: "2310"
  },
  {
    commodity: "Seetapal",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "4070",
    max_price: "4570",
    modal_price: "4320"
  },
  {
    commodity: "Bitter gourd",
    state: "Maharashtra",
    district: "Pune",
    market: "Khed(Chakan)",
    arrival_date: "10/10/2025",
    min_price: "2500",
    max_price: "3500",
    modal_price: "3000"
  },
  {
    commodity: "Cauliflower",
    state: "Maharashtra",
    district: "Pune",
    market: "Khed(Chakan)",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "1600",
    modal_price: "1300"
  },
  {
    commodity: "Grapes",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune",
    arrival_date: "10/10/2025",
    min_price: "7000",
    max_price: "16000",
    modal_price: "11500"
  },
  {
    commodity: "Pear(Marasebu)",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune",
    arrival_date: "10/10/2025",
    min_price: "7000",
    max_price: "7500",
    modal_price: "7200"
  },
  {
    commodity: "Pomegranate",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "17000",
    modal_price: "9000"
  },
  {
    commodity: "Tender Coconut",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune",
    arrival_date: "10/10/2025",
    min_price: "1300",
    max_price: "1600",
    modal_price: "1400"
  },
  {
    commodity: "Water Melon",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "1500",
    modal_price: "1200"
  },
  {
    commodity: "Brinjal",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "5000",
    max_price: "6000",
    modal_price: "5500"
  },
  {
    commodity: "Chikoos(Sapota)",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "4000",
    max_price: "4000",
    modal_price: "4000"
  },
  {
    commodity: "Garlic",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "7000",
    max_price: "7000",
    modal_price: "7000"
  },
  {
    commodity: "Green Chilli",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "4000",
    modal_price: "3500"
  },
  {
    commodity: "Little gourd (Kundru)",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "4000",
    max_price: "5000",
    modal_price: "4500"
  },
  {
    commodity: "Papaya",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "2500",
    max_price: "2500",
    modal_price: "2500"
  },
  {
    commodity: "Onion",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Pimpri)",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "1300",
    modal_price: "1150"
  },
  {
    commodity: "Tomato",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Pimpri)",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "2000",
    modal_price: "1500"
  },
  {
    commodity: "Orange",
    state: "Maharashtra",
    district: "Sangli",
    market: "Sangli(Phale, Bhajipura Market)",
    arrival_date: "10/10/2025",
    min_price: "1500",
    max_price: "4000",
    modal_price: "2750"
  },
  {
    commodity: "Ginger(Green)",
    state: "Maharashtra",
    district: "Satara",
    market: "Patan",
    arrival_date: "10/10/2025",
    min_price: "1500",
    max_price: "2500",
    modal_price: "2000"
  },
  {
    commodity: "Green Gram (Moong)(Whole)",
    state: "Maharashtra",
    district: "Thane",
    market: "Kalyan",
    arrival_date: "10/10/2025",
    min_price: "9000",
    max_price: "12000",
    modal_price: "10500"
  },
  {
    commodity: "Bhindi(Ladies Finger)",
    state: "Maharashtra",
    district: "Thane",
    market: "Murbad",
    arrival_date: "10/10/2025",
    min_price: "3500",
    max_price: "4500",
    modal_price: "4000"
  },
  {
    commodity: "Wheat",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Karjat",
    arrival_date: "10/10/2025",
    min_price: "2500",
    max_price: "2900",
    modal_price: "2500"
  },
  {
    commodity: "Black Gram (Urd Beans)(Whole)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Karjat(Rashin)",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "6000",
    modal_price: "5500"
  },
  {
    commodity: "Carrot",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "2000",
    max_price: "2000",
    modal_price: "2000"
  },
  {
    commodity: "Cucumbar(Kheera)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "500",
    max_price: "1750",
    modal_price: "1125"
  },
  {
    commodity: "Methi(Leaves)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "25",
    max_price: "25",
    modal_price: "25"
  },
  {
    commodity: "Wheat",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahuri",
    arrival_date: "10/10/2025",
    min_price: "2500",
    max_price: "2600",
    modal_price: "2550"
  },
  {
    commodity: "Bhindi(Ladies Finger)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "2500",
    max_price: "3000",
    modal_price: "2750"
  },
  {
    commodity: "Bottle gourd",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "1500",
    modal_price: "1250"
  },
  {
    commodity: "Cabbage",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "800",
    max_price: "1000",
    modal_price: "900"
  },
  {
    commodity: "Chilly Capsicum",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "2000",
    max_price: "3000",
    modal_price: "2500"
  },
  {
    commodity: "Drumstick",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "8000",
    max_price: "10000",
    modal_price: "9000"
  },
  {
    commodity: "Methi(Leaves)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "20",
    max_price: "30",
    modal_price: "25"
  },
  {
    commodity: "Potato",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "1400",
    max_price: "1600",
    modal_price: "1500"
  },
  {
    commodity: "Ridgeguard(Tori)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "2500",
    max_price: "3000",
    modal_price: "2750"
  },
  {
    commodity: "Coriander(Leaves)",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "5500",
    max_price: "7000",
    modal_price: "6500"
  },
  {
    commodity: "Green Chilli",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "4500",
    max_price: "5000",
    modal_price: "5000"
  },
  {
    commodity: "Guar",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "9000",
    max_price: "9000",
    modal_price: "9000"
  },
  {
    commodity: "Onion Green",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "5000",
    max_price: "5000",
    modal_price: "5000"
  },
  {
    commodity: "Beans",
    state: "Maharashtra",
    district: "Mumbai",
    market: "Mumbai",
    arrival_date: "10/10/2025",
    min_price: "4000",
    max_price: "4600",
    modal_price: "4300"
  },
  {
    commodity: "Bhindi(Ladies Finger)",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kalmeshwar",
    arrival_date: "10/10/2025",
    min_price: "1525",
    max_price: "2000",
    modal_price: "1820"
  },
  {
    commodity: "Brinjal",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kalmeshwar",
    arrival_date: "10/10/2025",
    min_price: "1505",
    max_price: "2000",
    modal_price: "1815"
  },
  {
    commodity: "Ginger(Green)",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "4020",
    max_price: "5020",
    modal_price: "4520"
  },
  {
    commodity: "Green Chilli",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "3040",
    max_price: "3540",
    modal_price: "3290"
  },
  {
    commodity: "Guava",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "2060",
    max_price: "2560",
    modal_price: "2310"
  },
  {
    commodity: "Onion",
    state: "Maharashtra",
    district: "Nashik",
    market: "Manmad",
    arrival_date: "10/10/2025",
    min_price: "300",
    max_price: "1186",
    modal_price: "1000"
  },
  {
    commodity: "Cucumbar(Kheera)",
    state: "Maharashtra",
    district: "Pune",
    market: "Khed(Chakan)",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "2000",
    modal_price: "1500"
  },
  {
    commodity: "Ginger(Green)",
    state: "Maharashtra",
    district: "Pune",
    market: "Khed(Chakan)",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "4500",
    modal_price: "3500"
  },
  {
    commodity: "Guar",
    state: "Maharashtra",
    district: "Pune",
    market: "Khed(Chakan)",
    arrival_date: "10/10/2025",
    min_price: "7000",
    max_price: "10000",
    modal_price: "8000"
  },
  {
    commodity: "Potato",
    state: "Maharashtra",
    district: "Pune",
    market: "Khed(Chakan)",
    arrival_date: "10/10/2025",
    min_price: "1200",
    max_price: "1800",
    modal_price: "1500"
  },
  {
    commodity: "Spinach",
    state: "Maharashtra",
    district: "Pune",
    market: "Khed(Chakan)",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "1500",
    modal_price: "1200"
  },
  {
    commodity: "Tomato",
    state: "Maharashtra",
    district: "Pune",
    market: "Khed(Chakan)",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "2200",
    modal_price: "1500"
  },
  {
    commodity: "Amla(Nelli Kai)",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune",
    arrival_date: "10/10/2025",
    min_price: "2000",
    max_price: "3000",
    modal_price: "2500"
  },
  {
    commodity: "Apple",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune",
    arrival_date: "10/10/2025",
    min_price: "4000",
    max_price: "14000",
    modal_price: "9000"
  },
  {
    commodity: "Pineapple",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune",
    arrival_date: "10/10/2025",
    min_price: "2600",
    max_price: "5000",
    modal_price: "3800"
  },
  {
    commodity: "Bitter gourd",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "4000",
    max_price: "5000",
    modal_price: "4500"
  },
  {
    commodity: "Cabbage",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "2000",
    modal_price: "1500"
  },
  {
    commodity: "Drumstick",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "9000",
    max_price: "10000",
    modal_price: "9500"
  },
  {
    commodity: "Guar",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "10000",
    max_price: "12000",
    modal_price: "11000"
  },
  {
    commodity: "Mint(Pudina)",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "5",
    max_price: "6",
    modal_price: "6"
  },
  {
    commodity: "Onion",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "500",
    max_price: "1300",
    modal_price: "900"
  },
  {
    commodity: "Peas Wet",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "8000",
    max_price: "10000",
    modal_price: "9000"
  },
  {
    commodity: "Potato",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Moshi)",
    arrival_date: "10/10/2025",
    min_price: "1400",
    max_price: "1700",
    modal_price: "1550"
  },
  {
    commodity: "Bottle gourd",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Pimpri)",
    arrival_date: "10/10/2025",
    min_price: "1500",
    max_price: "4000",
    modal_price: "2750"
  },
  {
    commodity: "Coriander(Leaves)",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Pimpri)",
    arrival_date: "10/10/2025",
    min_price: "7",
    max_price: "12",
    modal_price: "10"
  },
  {
    commodity: "Spinach",
    state: "Maharashtra",
    district: "Pune",
    market: "Pune(Pimpri)",
    arrival_date: "10/10/2025",
    min_price: "7",
    max_price: "9",
    modal_price: "8"
  },
  {
    commodity: "Guava",
    state: "Maharashtra",
    district: "Sangli",
    market: "Sangli(Phale, Bhajipura Market)",
    arrival_date: "10/10/2025",
    min_price: "1500",
    max_price: "3500",
    modal_price: "2500"
  },
  {
    commodity: "Seetapal",
    state: "Maharashtra",
    district: "Sangli",
    market: "Sangli(Phale, Bhajipura Market)",
    arrival_date: "10/10/2025",
    min_price: "2000",
    max_price: "5000",
    modal_price: "3500"
  },
  {
    commodity: "Brinjal",
    state: "Maharashtra",
    district: "Satara",
    market: "Patan",
    arrival_date: "10/10/2025",
    min_price: "1500",
    max_price: "2000",
    modal_price: "1750"
  },
  {
    commodity: "Bottle gourd",
    state: "Maharashtra",
    district: "Satara",
    market: "Vai",
    arrival_date: "10/10/2025",
    min_price: "2000",
    max_price: "2500",
    modal_price: "2250"
  },
  {
    commodity: "Brinjal",
    state: "Maharashtra",
    district: "Satara",
    market: "Vai",
    arrival_date: "10/10/2025",
    min_price: "4000",
    max_price: "5000",
    modal_price: "4500"
  },
  {
    commodity: "Cabbage",
    state: "Maharashtra",
    district: "Satara",
    market: "Vai",
    arrival_date: "10/10/2025",
    min_price: "1200",
    max_price: "1500",
    modal_price: "1350"
  },
  {
    commodity: "Ginger(Green)",
    state: "Maharashtra",
    district: "Satara",
    market: "Vai",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "4000",
    modal_price: "3500"
  },
  {
    commodity: "Ridgeguard(Tori)",
    state: "Maharashtra",
    district: "Satara",
    market: "Vai",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "3500",
    modal_price: "3250"
  },
  {
    commodity: "Jowar(Sorghum)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Karjat",
    arrival_date: "10/10/2025",
    min_price: "2200",
    max_price: "2900",
    modal_price: "2600"
  },
  {
    commodity: "Bitter gourd",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "2500",
    max_price: "3500",
    modal_price: "3000"
  },
  {
    commodity: "Drumstick",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "5000",
    max_price: "10000",
    modal_price: "7500"
  },
  {
    commodity: "Guar",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "6000",
    max_price: "13500",
    modal_price: "9700"
  },
  {
    commodity: "Onion Green",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "15",
    max_price: "15",
    modal_price: "15"
  },
  {
    commodity: "Tomato",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Rahata",
    arrival_date: "10/10/2025",
    min_price: "500",
    max_price: "1500",
    modal_price: "1000"
  },
  {
    commodity: "Brinjal",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "5000",
    max_price: "7000",
    modal_price: "6000"
  },
  {
    commodity: "Coriander(Leaves)",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "10",
    max_price: "20",
    modal_price: "15"
  },
  {
    commodity: "Garlic",
    state: "Maharashtra",
    district: "Ahmednagar",
    market: "Shrirampur",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "5000",
    modal_price: "4000"
  },
  {
    commodity: "Bhindi(Ladies Finger)",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "3000",
    max_price: "4000",
    modal_price: "3500"
  },
  {
    commodity: "Bitter gourd",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "1500",
    modal_price: "1200"
  },
  {
    commodity: "Mango (Raw-Ripe)",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "5000",
    max_price: "5000",
    modal_price: "5000"
  },
  {
    commodity: "Marigold(Calcutta)",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "2000",
    max_price: "2000",
    modal_price: "2000"
  },
  {
    commodity: "Methi(Leaves)",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "5000",
    max_price: "6000",
    modal_price: "5500"
  },
  {
    commodity: "Raddish",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "1200",
    modal_price: "1200"
  },
  {
    commodity: "Tomato",
    state: "Maharashtra",
    district: "Jalgaon",
    market: "Bhusaval",
    arrival_date: "10/10/2025",
    min_price: "2200",
    max_price: "3000",
    modal_price: "2500"
  },
  {
    commodity: "Beetroot",
    state: "Maharashtra",
    district: "Mumbai",
    market: "Mumbai",
    arrival_date: "10/10/2025",
    min_price: "1600",
    max_price: "2200",
    modal_price: "1900"
  },
  {
    commodity: "Cucumbar(Kheera)",
    state: "Maharashtra",
    district: "Mumbai",
    market: "Mumbai",
    arrival_date: "10/10/2025",
    min_price: "2000",
    max_price: "2400",
    modal_price: "2200"
  },
  {
    commodity: "Lime",
    state: "Maharashtra",
    district: "Mumbai",
    market: "Mumbai",
    arrival_date: "10/10/2025",
    min_price: "1500",
    max_price: "2500",
    modal_price: "2000"
  },
  {
    commodity: "Sweet Pumpkin",
    state: "Maharashtra",
    district: "Mumbai",
    market: "Mumbai",
    arrival_date: "10/10/2025",
    min_price: "1400",
    max_price: "2000",
    modal_price: "1700"
  },
  {
    commodity: "Potato",
    state: "Maharashtra",
    district: "Mumbai",
    market: "Vashi New Mumbai",
    arrival_date: "10/10/2025",
    min_price: "900",
    max_price: "1800",
    modal_price: "1350"
  },
  {
    commodity: "Cabbage",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kalmeshwar",
    arrival_date: "10/10/2025",
    min_price: "1045",
    max_price: "1500",
    modal_price: "1365"
  },
  {
    commodity: "Spinach",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kalmeshwar",
    arrival_date: "10/10/2025",
    min_price: "2560",
    max_price: "3000",
    modal_price: "2840"
  },
  {
    commodity: "Tomato",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kalmeshwar",
    arrival_date: "10/10/2025",
    min_price: "2035",
    max_price: "2500",
    modal_price: "2355"
  },
  {
    commodity: "Bhindi(Ladies Finger)",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "2070",
    max_price: "2570",
    modal_price: "2320"
  },
  {
    commodity: "Bottle gourd",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "1530",
    max_price: "2030",
    modal_price: "1780"
  },
  {
    commodity: "Coriander(Leaves)",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "9030",
    max_price: "10030",
    modal_price: "9530"
  },
  {
    commodity: "Cucumbar(Kheera)",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "1060",
    max_price: "1560",
    modal_price: "1310"
  },
  {
    commodity: "Garlic",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "8090",
    max_price: "9060",
    modal_price: "8575"
  },
  {
    commodity: "Onion",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "1540",
    max_price: "2040",
    modal_price: "1790"
  },
  {
    commodity: "Raddish",
    state: "Maharashtra",
    district: "Nagpur",
    market: "Kamthi",
    arrival_date: "10/10/2025",
    min_price: "3540",
    max_price: "4040",
    modal_price: "3790"
  },
  {
    commodity: "Cabbage",
    state: "Maharashtra",
    district: "Pune",
    market: "Khed(Chakan)",
    arrival_date: "10/10/2025",
    min_price: "1000",
    max_price: "1500",
    modal_price: "1200"
  },
  {
    commodity: "Coriander(Leaves)",
    state: "Maharashtra",
    district: "Pune",
    market: "Khed(Chakan)",
    arrival_date: "10/10/2025",
    min_price: "1500",
    max_price: "2700",
    modal_price: "2200"
  },
  {
    commodity: "Onion",
    state: "Maharashtra",
    district: "Pune",
    market: "Khed(Chakan)",
    arrival_date: "10/10/2025",
    min_price: "800",
    max_price: "1400",
    modal_price: "1200"
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Make sure your connection string is correct
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/farmfriend");
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Function to import data
const importData = async () => {
  try {
    // Clear existing data in the Marketplace collection
    await Marketplace.deleteMany();

    // Insert the new, updated data
    await Marketplace.insertMany(maharashtraMarketData);

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error importing data: ${error}`);
    process.exit(1);
  }
};

// Function to destroy data
const destroyData = async () => {
  try {
    await Marketplace.deleteMany();
    console.log('✅ Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error destroying data: ${error}`);
    process.exit(1);
  }
};

// Main execution logic
const run = async () => {
  await connectDB();

  // Check for command line arguments to decide whether to import or destroy
  if (process.argv[2] === '-d') {
    await destroyData();
  } else {
    await importData();
  }
};

run();