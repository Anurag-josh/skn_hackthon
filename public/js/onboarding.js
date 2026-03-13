document.addEventListener('DOMContentLoaded', () => {
    const onboardingSection = document.getElementById('onboarding-section');
    const farmerId = window.farmerId;
    const micButton = document.getElementById('voice-assistant-ui');
    const micIcon = document.getElementById('mic-icon');
    const stopIcon = document.getElementById('stop-icon');
    const voiceStatus = document.getElementById('voice-status');
    const voiceStatusText = document.getElementById('voice-status-text');
    // Audio controls
    const audioControls = document.getElementById('audio-controls');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const stopBtn = document.getElementById('stop-btn');

    if (!farmerId) {
        window.location.href = '/login';
        return;
    }

    // --- CROP AND LOCATION DATA (all in one file) ---
    const KERALA_CROPS = [
        "Rubber", "Tea", "Coffee", "Cardamom", "Coconut", "Cashew", 
        "Cocoa", "Black Pepper", "Nutmeg", "Cloves", "Cinnamon", "Allspice", 
        "Mace", "Vanilla", "Ginger", "Turmeric", "Lemongrass", "Rice", 
        "Tapioca", "Yam", "Colocasia", "Sweet Potato", "Banana", "Pineapple", 
        "Mango", "Jackfruit", "Papaya", "Guava", "Sapota", "Passion Fruit", 
        "Rambutan", "Durian", "Mangosteen", "Avocado", "Lime", "Lemon", 
        "Watermelon", "Muskmelon", "Dragon Fruit", "Bitter Gourd", 
        "Snake Gourd", "Ridge Gourd", "Ash Gourd", "Pumpkin", "Cucumber", 
        "Okra", "Drumstick", "Brinjal", "Tomato", "Chilli", "Onion", 
        "Garlic", "Cabbage", "Cauliflower", "Carrot", "Beetroot", "Beans", 
        "Spinach", "Curry Leaves", "Betel Leaf", "Ayurvedic Herbs"
    ];

    const INDIAN_STATES_AND_DISTRICTS = {
        "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
        "Arunachal Pradesh": ["Anjaw", "Changlang", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Dibang Valley", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
        "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
        "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
        "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
        "Goa": ["North Goa", "South Goa"],
        "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
        "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
        "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
        "Jammu and Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
        "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"],
        "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Kalaburagi", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
        "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
        "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Narnaul", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
        "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
        "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
        "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
        "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],
        "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
        "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
        "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"],
        "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
        "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
        "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
        "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
        "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
        "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Badaun", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shrawasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
        "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
        "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
    };

    function isValidCrop(cropName) {
        if (!cropName) return false;
        const normalizedCrop = cropName.trim().toLowerCase();
        return KERALA_CROPS.map(c => c.toLowerCase()).includes(normalizedCrop);
    }

    // Language selection and translation data
    const LANGUAGES = [
        { code: 'en-IN', name: 'English', flag: '🇬🇧' },
        { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
        { code: 'mr-IN', name: 'Marathi', flag: '🇮🇳' },
        { code: 'ml-IN', name: 'Malayalam', flag: '🇮🇳' }
    ];

    const TRANSLATIONS = {
        'en-IN': {
            selectLanguage: "Please select your preferred language",
            startOnboarding: "Start Onboarding",
            nameQuestion: (name) => name ? `Nice to meet you, ${name}! What should we call you?` : "Let's start with your name. What should we call you?",
            locationQuestion: (name) => `Nice to meet you, ${name}! Where is your farm located?`,
            landSizeQuestion: (name) => `${name}, how large is your plot of land? (e.g., 5 acres)`,
            cropQuestion: (name) => `${name}, what is the main crop you are currently growing?`,
            irrigationQuestion: (name) => `${name}, and finally, what is your primary irrigation method?`,
            selectState: "Select State",
            selectDistrict: "Select District",
            nextButton: "Next →",
            speakInsteadButton: "🎙️ Speak instead",
            confirmation: (answer) => `You have entered: ${answer}`,
            summaryTitle: "Onboarding Complete!",
            summaryHeading: "Your Information:",
            nameLabel: "Name:",
            locationLabel: "Location:",
            landSizeLabel: "Land Size:",
            cropLabel: "Main Crop:",
            irrigationLabel: "Irrigation Method:",
            saveProfile: "Save Profile",
            savingProfile: "Saving your profile...",
            profileSaved: "Profile saved successfully! Redirecting to your dashboard.",
            saveError: "Sorry, there was an error saving your details. Please try again.",
            keralaCropError: "This crop may not be suitable for the Kerala region. Please choose a different crop.",
            locationError: "Please select both a state and a district.",
            summaryText: (data) => `Here is a summary of your information. Name: ${data.name}. Location: ${data.location}. Land Size: ${data.landSize}. Main Crop: ${data.mainCrop}. Irrigation Method: ${data.irrigationMethod}.`,
            listening: "Listening...",
            speaking: "Speaking...",
            playAudio: "Play Audio",
            pauseAudio: "Pause Audio",
            stopAudio: "Stop Audio"
        },
        'hi-IN': {
            selectLanguage: "कृपया अपनी पसंदीदा भाषा चुनें",
            startOnboarding: "ऑनबोर्डिंग शुरू करें",
            nameQuestion: (name) => name ? `आपसे मिलकर अच्छा लगा, ${name}! हम आप्को क्या कहें?` : "चलिए आपका नाम शुरू करते हैं। हम आप्को क्या कहें?",
            locationQuestion: (name) => `आपसे मिलकर अच्छा लगा, ${name}! आपका खेत कहाँ स्थित है?`,
            landSizeQuestion: (name) => `${name}, आपके खेत का आकार कितना है? (उदाहरण के लिए, 5 एकड़)`,
            cropQuestion: (name) => `${name}, आपके द्वारा उगाई जाने वाली मुख्य फसल क्या है?`,
            irrigationQuestion: (name) => `${name}, और अंत में, आपकी प्राथमिक सिंचाई विधि क्या है?`,
            selectState: "राज्य चुनें",
            selectDistrict: "जिला चुनें",
            nextButton: "अगला →",
            speakInsteadButton: "🎙️ बोलकर दर्ज करें",
            confirmation: (answer) => `आपने दर्ज किया है: ${answer}`,
            summaryTitle: "ऑनबोर्डिंग पूर्ण!",
            summaryHeading: "आपकी जानकारी:",
            nameLabel: "नाम:",
            locationLabel: "स्थान:",
            landSizeLabel: "भूमि का आकार:",
            cropLabel: "मुख्य फसल:",
            irrigationLabel: "सिंचाई की विधि:",
            saveProfile: "प्रोफ़ाइल सहेजें",
            savingProfile: "आपकी प्रोफ़ाइल सहेजी जा रही है...",
            profileSaved: "प्रोफ़ाइल सफलतापूर्वक सहेजा गया! आपके डैशबोर्ड पर पुनः निर्देशित किया जा रहा है।",
            saveError: "क्षमा करें, आपके विवरण सहेजने में त्रुटि हुई। कृपया पुन: प्रयास करें।",
            keralaCropError: "यह फसल केरल क्षेत्र के लिए उपयुक्त नहीं हो सकती है। कृपया कोई भिन्न फसल चुनें।",
            locationError: "कृपया एक राज्य और एक जिला दोनों का चयन करें।",
            summaryText: (data) => `आपकी जानकारी का सारांश। नाम: ${data.name}। स्थान: ${data.location}। भूमि का आकार: ${data.landSize}। मुख्य फसल: ${data.mainCrop}। सिंचाई की विधि: ${data.irrigationMethod}।`,
            listening: "सुन रहे हैं...",
            speaking: "बोल रहे हैं...",
            playAudio: "ऑडियो चलाएं",
            pauseAudio: "ऑडियो रोकें",
            stopAudio: "ऑडियो बंद करें"
        },
        'mr-IN': {
            selectLanguage: "कृपया आपली आवडती भाषा निवडा",
            startOnboarding: "ऑनबोर्डिंग सुरू करा",
            nameQuestion: (name) => name ? `तुमच्याशी भेटून आनंद झाला, ${name}! आम्ही तुम्हाला काय म्हणू?` : "चला तुमचे नाव सुरू करूया. आम्ही तुम्हाला काय म्हणू?",
            locationQuestion: (name) => `तुमच्याशी भेटून आनंद झाला, ${name}! तुमचे शेत कुठे आहे?`,
            landSizeQuestion: (name) => `${name}, तुमच्या शेताचे क्षेत्रफळ किती आहे? (उदाहरणार्थ, 5 एकर)`,
            cropQuestion: (name) => `${name}, तुम्ही सध्या कोणती मुख्य पिके लावता?`,
            irrigationQuestion: (name) => `${name}, आणि शेवटी, तुमची प्राथमिक सिंचन पद्धत कोणती?`,
            selectState: "राज्य निवडा",
            selectDistrict: "जिल्हा निवडा",
            nextButton: "पुढे →",
            speakInsteadButton: "🎙️ बोलून नोंदवा",
            confirmation: (answer) => `तुम्ही प्रविष्ट केले आहे: ${answer}`,
            summaryTitle: "ऑनबोर्डिंग पूर्ण!",
            summaryHeading: "तुमची माहिती:",
            nameLabel: "नाव:",
            locationLabel: "स्थान:",
            landSizeLabel: "जमिनीचे आकार:",
            cropLabel: "मुख्य पिक:",
            irrigationLabel: "सिंचन पद्धत:",
            saveProfile: "प्रोफाइल जतन करा",
            savingProfile: "तुमचे प्रोफाइल जतन करत आहे...",
            profileSaved: "प्रोफाइल यशस्वीरित्या जतन केले! तुमच्या डॅशबोर्डवर पुनर्निर्देशित करत आहे.",
            saveError: "क्षमस्व, तुमची माहिती जतन करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.",
            keralaCropError: "ही पिक केरळ प्रदेशासाठी योग्य नसू शकते. कृपया वेगळी पिक निवडा.",
            locationError: "कृपया एक राज्य आणि एक जिल्हा दोन्ही निवडा.",
            summaryText: (data) => `तुमच्या माहितीचे सारांश. नाव: ${data.name}. स्थान: ${data.location}. जमिनीचे आकार: ${data.landSize}. मुख्य पिक: ${data.mainCrop}. सिंचन पद्धत: ${data.irrigationMethod}.`,
            listening: "ऐकत आहे...",
            speaking: "बोलत आहे...",
            playAudio: "ऑडियो प्ले करा",
            pauseAudio: "ऑडियो थांबवा",
            stopAudio: "ऑडियो बंद करा"
        },
        'ml-IN': {
            selectLanguage: "ദയവായി നിങ്ങളുടെ ഇഷ്ടഭാഷ തിരഞ്ഞെടുക്കുക",
            startOnboarding: "ഓൺബോർഡിംഗ് ആരംഭിക്കുക",
            nameQuestion: (name) => name ? `നിങ്ങളെ കണ്ടതിൽ സന്തോഷം, ${name}! ഞങ്ങൾ നിങ്ങളെ എന്തെന്ന് വിളിക്കണം?` : "നമുക്ക് നിങ്ങളുടെ പേര് തുടങ്ങാം. ഞങ്ങൾ നിങ്ങളെ എന്തെന്ന് വിളിക്കണം?",
            locationQuestion: (name) => `നിങ്ങളെ കണ്ടതിൽ സന്തോഷം, ${name}! നിങ്ങളുടെ കൃഷിഭൂമി എവിടെയാണ്?`,
            landSizeQuestion: (name) => `${name}, നിങ്ങളുടെ കൃഷിഭൂമി എത്ര വലുതാണ്? (ഉദാഹരണത്തിന്, 5 ഏക്കർ)`,
            cropQuestion: (name) => `${name}, നിങ്ങൾ ഇപ്പോൾ വളർത്തുന്ന പ്രധാन വിള ഏതാണ്?`,
            irrigationQuestion: (name) => `${name}, അവസാനമായി, നിങ്ങളുടെ പ്രാഥമിക ജലസേചന രീതി എന്താണ്?`,
            selectState: "സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",
            selectDistrict: "ജില്ല തിരഞ്ഞെടുക്കുക",
            nextButton: "അടുത്തത് →",
            speakInsteadButton: "🎙️ സംസാരിച്ച് നൽകുക",
            confirmation: (answer) => `നിങ്ങൾ നൽകിയത്: ${answer}`,
            summaryTitle: "ഓൺബോർഡിംഗ് പൂർത്തിയായി!",
            summaryHeading: "നിങ്ങളുടെ വിവരങ്ങൾ:",
            nameLabel: "പേര്:",
            locationLabel: "സ്ഥലം:",
            landSizeLabel: "ഭൂമിയുടെ വലിപ്പം:",
            cropLabel: "പ്രധാന വിള:",
            irrigationLabel: "ജലസേചന രീതി:",
            saveProfile: "പ്രൊഫൈൽ സംരക്ഷിക്കുക",
            savingProfile: "നിങ്ങളുടെ പ്രൊഫൈൽ സംരക്ഷിക്കുന്നു...",
            profileSaved: "പ്രൊഫൈൽ വിജയകരമായി സംരക്ഷിച്ചു! നിങ്ങളുടെ ഡാഷ്ബോർഡിലേക്ക് നിർദ്ദേശിക്കുന്നു.",
            saveError: "ക്ഷമിക്കണം, നിങ്ങളുടെ വിവരങ്ങൾ സംരക്ഷിക്കുന്നതിൽ പിശക് സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
            keralaCropError: "ഈ വിള കേരള പ്രദേശത്തിന് അനുയോജ്യമല്ല. ദയവായി വേറൊരു വിള തിരഞ്ഞെടുക്കുക.",
            locationError: "ദയവായി ഒരു സംസ്ഥാനവും ഒരു ജില്ലയും തിരഞ്ഞെടുക്കുക.",
            summaryText: (data) => `നിങ്ങളുടെ വിവരങ്ങളുടെ സംഗ്രഹം. പേര്: ${data.name}. സ്ഥലം: ${data.location}. ഭൂമിയുടെ വലിപ്പം: ${data.landSize}. പ്രധാന വിള: ${data.mainCrop}. ജലസേചന രീതി: ${data.irrigationMethod}.`,
            listening: "കേൾക്കുന്നു...",
            speaking: "സംസാരിക്കുന്നു...",
            playAudio: "ഓഡിയോ പ്ലേ ചെയ്യുക",
            pauseAudio: "ഓഡിയോ താൽക്കാലികമായി നിർത്തുക",
            stopAudio: "ഓഡിയോ നിർത്തുക"
        }
    };

    // Voice Assistant variables
    let isListening = false;
    let recognition;
    let speechSynthesis = window.speechSynthesis;
    let isSpeaking = false; // Track if system is currently speaking
    let selectedLang = 'en-IN'; // Default language
    let currentUtterance = null; // Track current utterance
    let inputMode = "text"; // Track input mode: "text" or "voice"
    
    // Initialize speech recognition
    function initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Speech Recognition is not supported in this browser.");
            return null;
        }
        
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = selectedLang;
        
        recognition.onstart = () => {
            isListening = true;
            micIcon.classList.add('hidden');
            stopIcon.classList.remove('hidden');
            voiceStatus.classList.remove('hidden');
            voiceStatusText.textContent = getTranslation('listening');
        };
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            handleVoiceInput(transcript);
        };
        
        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            stopListening();
        };
        
        recognition.onend = () => {
            stopListening();
        };
        
        return recognition;
    }
    
    // Start listening for voice input
    function startListening() {
        if (!recognition) {
            recognition = initSpeechRecognition();
        }
        
        // Update recognition language
        if (recognition) {
            recognition.lang = selectedLang;
        }
        
        if (recognition && !isListening) {
            try {
                recognition.start();
            } catch (error) {
                console.error("Error starting speech recognition:", error);
            }
        }
    }
    
    // Stop listening for voice input
    function stopListening() {
        if (recognition && isListening) {
            recognition.stop();
            isListening = false;
            micIcon.classList.remove('hidden');
            stopIcon.classList.add('hidden');
            voiceStatus.classList.add('hidden');
        }
    }
    
    // Get translation for current language
    function getTranslation(key, ...params) {
        const translations = TRANSLATIONS[selectedLang];
        if (translations && translations[key]) {
            if (typeof translations[key] === 'function') {
                return translations[key](...params);
            }
            return translations[key];
        }
        // Fallback to English
        return TRANSLATIONS['en-IN'][key] ? TRANSLATIONS['en-IN'][key] : key;
    }
    
    // Speak text using speech synthesis
    function speakText(text) {
        // Prevent speaking alerts or error messages
        if (text.includes('alert') || text.includes('error') || text.includes('Error')) {
            return;
        }
        
        if (!speechSynthesis) {
            console.warn("Speech Synthesis is not supported in this browser.");
            return;
        }
        
        // Cancel any ongoing speech
        if (isSpeaking) {
            speechSynthesis.cancel();
        }
        
        isSpeaking = true;
        currentUtterance = new SpeechSynthesisUtterance(text);
        currentUtterance.rate = 1;
        currentUtterance.pitch = 1;
        currentUtterance.volume = 1;
        currentUtterance.lang = selectedLang; // Set language for speech synthesis
        
        currentUtterance.onstart = () => {
            voiceStatusText.textContent = getTranslation('speaking');
            voiceStatus.classList.remove('hidden');
            audioControls.classList.remove('hidden');
        };
        
        currentUtterance.onend = () => {
            isSpeaking = false;
            currentUtterance = null;
            voiceStatus.classList.add('hidden');
            audioControls.classList.add('hidden');
            // Auto-start listening after speaking ends if in voice mode
            if (inputMode === "voice") {
                setTimeout(() => {
                    startListening();
                }, 500);
            }
        };
        
        speechSynthesis.speak(currentUtterance);
    }
    
    // Handle voice input
    function handleVoiceInput(transcript) {
        stopListening();
        
        // Display the recognized text in the input field
        const answerInput = document.getElementById('answer-input');
        const irrigationInput = document.getElementById('irrigation-input');
        const cropInput = document.getElementById('crop-input');
        const landSizeInput = document.getElementById('land-size-input');
        
        if (answerInput) {
            answerInput.value = transcript;
        } else if (irrigationInput) {
            irrigationInput.value = transcript;
        } else if (cropInput) {
            cropInput.value = transcript;
        } else if (landSizeInput) {
            landSizeInput.value = transcript;
        }
        
        // Auto-submit after a short delay to allow confirmation
        setTimeout(() => {
            const form = document.getElementById('onboarding-form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }, 1500); // Increased delay to ensure full processing
    }
    
    // Stop current speech
    function stopSpeech() {
        if (isSpeaking && currentUtterance) {
            speechSynthesis.cancel();
            isSpeaking = false;
            currentUtterance = null;
            voiceStatus.classList.add('hidden');
            audioControls.classList.add('hidden');
        }
    }
    
    // Pause current speech
    function pauseSpeech() {
        if (isSpeaking && currentUtterance) {
            speechSynthesis.pause();
        }
    }
    
    // Resume speech
    function resumeSpeech() {
        if (isSpeaking && currentUtterance) {
            speechSynthesis.resume();
        }
    }

    const questions = [
        { key: 'name', prompt: (name) => getTranslation('nameQuestion', name) },
        { key: 'location', prompt: (name) => getTranslation('locationQuestion', name) },
        { key: 'landSize', prompt: (name) => getTranslation('landSizeQuestion', name) },
        { key: 'mainCrop', prompt: (name) => getTranslation('cropQuestion', name) },
        { key: 'irrigationMethod', prompt: (name) => getTranslation('irrigationQuestion', name) },
    ];

    let currentQuestionIndex = 0;
    const farmerData = {};

    // Add event listener to mic button
    micButton.addEventListener('click', () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    });
    
    // Add event listeners to audio controls
    if (playBtn) playBtn.addEventListener('click', () => {
        if (currentUtterance) {
            resumeSpeech();
        } else if (questions[currentQuestionIndex]) {
            const question = questions[currentQuestionIndex];
            const prompt = typeof question.prompt === 'function' ? question.prompt(farmerData.name || '') : question.prompt;
            speakText(prompt);
        }
    });
    
    if (pauseBtn) pauseBtn.addEventListener('click', pauseSpeech);
    
    if (stopBtn) stopBtn.addEventListener('click', stopSpeech);

    // Render language selection screen
    function renderLanguageSelection() {
        onboardingSection.innerHTML = `
            <div id="language-selection">
                <h2 class="text-2xl font-bold text-green-700 mb-6">${getTranslation('selectLanguage')}</h2>
                <div class="grid grid-cols-1 gap-4">
                    ${LANGUAGES.map(lang => `
                        <button data-lang="${lang.code}" class="flex items-center justify-between bg-white border-2 border-green-500 rounded-lg p-4 hover:bg-green-50 transition-colors">
                            <span class="text-lg font-medium">${lang.flag} ${lang.name}</span>
                            <span class="text-gray-500">${lang.code}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Add event listeners to language buttons
        document.querySelectorAll('#language-selection button').forEach(button => {
            button.addEventListener('click', () => {
                selectedLang = button.dataset.lang;
                // Reinitialize speech recognition with new language
                if (recognition) {
                    recognition.lang = selectedLang;
                }
                renderQuestion();
            });
        });
    }

    function renderLocationDropdowns() {
        const states = Object.keys(INDIAN_STATES_AND_DISTRICTS).sort();
        const stateSelect = document.getElementById('state-select');
        const districtSelect = document.getElementById('district-select');

        // Populate states dropdown
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });

        // Event listener for state change
        stateSelect.addEventListener('change', () => {
            const selectedState = stateSelect.value;
            const districts = INDIAN_STATES_AND_DISTRICTS[selectedState] || [];
            
            // Clear and populate districts dropdown
            districtSelect.innerHTML = `<option value="">${getTranslation('selectDistrict')}</option>`; // Reset districts
            districts.forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        });

        // Trigger change event to populate districts for the default state
        stateSelect.value = "Kerala"; // Set default to Kerala
        stateSelect.dispatchEvent(new Event('change'));
    }

    function renderQuestion(errorMessage = '') {
        const question = questions[currentQuestionIndex];
        const prompt = typeof question.prompt === 'function' ? question.prompt(farmerData.name || '') : question.prompt;
        
        const errorMessageHtml = errorMessage 
            ? `<p class="text-red-600 mb-4">${errorMessage}</p>`
            : '';

        if (question.key === 'location') {
            onboardingSection.innerHTML = `
                <form id="onboarding-form">
                    <label class="block text-xl font-semibold text-gray-800 mb-4">${prompt}</label>
                    ${errorMessageHtml}
                    <div class="space-y-4 mb-4">
                        <div>
                            <label for="state-select" class="block text-sm font-medium text-gray-700">${getTranslation('selectState')}</label>
                            <select id="state-select" class="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500" required>
                                <option value="">${getTranslation('selectState')}</option>
                            </select>
                        </div>
                        <div>
                            <label for="district-select" class="block text-sm font-medium text-gray-700">${getTranslation('selectDistrict')}</label>
                            <select id="district-select" class="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500" required>
                                <option value="">${getTranslation('selectDistrict')}</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex gap-2 mt-4">
                        <button type="submit" class="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex-1">${getTranslation('nextButton')}</button>
                        <button type="button" id="speak-instead-btn" class="bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">${getTranslation('speakInsteadButton')}</button>
                    </div>
                </form>
            `;
            renderLocationDropdowns();
        } else if (question.key === 'irrigationMethod') {
            // Special handling for irrigation method with voice input
            onboardingSection.innerHTML = `
                <form id="onboarding-form">
                    <label for="irrigation-input" class="block text-xl font-semibold text-gray-800 mb-4">${prompt}</label>
                    ${errorMessageHtml}
                    <input type="text" id="irrigation-input" class="w-full p-3 border border-gray-300 rounded-lg text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" required autofocus>
                    <div class="flex gap-2 mt-4">
                        <button type="submit" class="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex-1">${getTranslation('nextButton')}</button>
                        <button type="button" id="speak-instead-btn" class="bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">${getTranslation('speakInsteadButton')}</button>
                    </div>
                </form>
            `;
        } else if (question.key === 'mainCrop') {
            // Special handling for crop name with voice input
            onboardingSection.innerHTML = `
                <form id="onboarding-form">
                    <label for="crop-input" class="block text-xl font-semibold text-gray-800 mb-4">${prompt}</label>
                    ${errorMessageHtml}
                    <input type="text" id="crop-input" class="w-full p-3 border border-gray-300 rounded-lg text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" required autofocus>
                    <div class="flex gap-2 mt-4">
                        <button type="submit" class="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex-1">${getTranslation('nextButton')}</button>
                        <button type="button" id="speak-instead-btn" class="bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">${getTranslation('speakInsteadButton')}</button>
                    </div>
                </form>
            `;
        } else if (question.key === 'landSize') {
            // Special handling for land size with voice input
            onboardingSection.innerHTML = `
                <form id="onboarding-form">
                    <label for="land-size-input" class="block text-xl font-semibold text-gray-800 mb-4">${prompt}</label>
                    ${errorMessageHtml}
                    <input type="text" id="land-size-input" class="w-full p-3 border border-gray-300 rounded-lg text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" required autofocus>
                    <div class="flex gap-2 mt-4">
                        <button type="submit" class="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex-1">${getTranslation('nextButton')}</button>
                        <button type="button" id="speak-instead-btn" class="bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">${getTranslation('speakInsteadButton')}</button>
                    </div>
                </form>
            `;
        } else {
            onboardingSection.innerHTML = `
                <form id="onboarding-form">
                    <label for="answer-input" class="block text-xl font-semibold text-gray-800 mb-4">${prompt}</label>
                    ${errorMessageHtml}
                    <input type="text" id="answer-input" class="w-full p-3 border border-gray-300 rounded-lg text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" required autofocus>
                    <div class="flex gap-2 mt-4">
                        <button type="submit" class="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex-1">${getTranslation('nextButton')}</button>
                        <button type="button" id="speak-instead-btn" class="bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">${getTranslation('speakInsteadButton')}</button>
                    </div>
                </form>
            `;
        }
        
        // Add event listeners
        document.getElementById('onboarding-form').addEventListener('submit', handleFormSubmit);
        
        // Add event listener for speak instead button
        const speakInsteadBtn = document.getElementById('speak-instead-btn');
        if (speakInsteadBtn) {
            speakInsteadBtn.addEventListener('click', () => {
                inputMode = "voice";
                startListening();
            });
        }
        
        // Automatically speak the question when it loads, but only once
        if (!isSpeaking) {
            setTimeout(() => {
                speakText(prompt);
            }, 300);
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const currentKey = questions[currentQuestionIndex].key;

        let answer;
        if (currentKey === 'location') {
            const state = document.getElementById('state-select').value;
            const district = document.getElementById('district-select').value;
            if (!state || !district) {
                renderQuestion(getTranslation('locationError'));
                return;
            }
            // Combine state and district into a single string to match schema
            answer = `${district}, ${state}`;
            console.log("Selected Location:", answer);
        } else if (currentKey === 'irrigationMethod') {
            const irrigationInput = document.getElementById('irrigation-input');
            answer = irrigationInput.value.trim();
        } else if (currentKey === 'mainCrop') {
            const cropInput = document.getElementById('crop-input');
            answer = cropInput.value.trim();
        } else if (currentKey === 'landSize') {
            const landSizeInput = document.getElementById('land-size-input');
            answer = landSizeInput.value.trim();
        } else {
            const answerInput = document.getElementById('answer-input');
            answer = answerInput.value.trim();
        }
        
        // Save the current answer
        farmerData[currentKey] = answer;

        // Speak confirmation
        speakText(getTranslation('confirmation', answer));
        
        // Check for the mainCrop question and validate if the location is Kerala
        if (currentKey === 'mainCrop') {
            const normalizedLocation = farmerData.location.trim().toLowerCase();
            if (normalizedLocation.includes('kerala')) {
                if (!isValidCrop(answer)) {
                    const errorMessage = getTranslation('keralaCropError');
                    speakText(errorMessage);
                    renderQuestion(errorMessage);
                    return;
                }
            }
        }
        
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            // Wait for the confirmation to be fully spoken before moving to next question
            setTimeout(() => {
                // Reset input mode to text for next question
                inputMode = "text";
                renderQuestion();
            }, 4000); // Increased timeout to ensure full speech completion
        } else {
            // Wait for confirmation before showing summary
            setTimeout(() => {
                // Reset input mode
                inputMode = "text";
                showSummary();
            }, 4000);
        }
    }

    function showSummary() {
        onboardingSection.innerHTML = `
            <div id="summary-section">
                <h2 class="text-2xl font-bold text-green-700 mb-6">${getTranslation('summaryTitle')}</h2>
                <div class="bg-gray-50 p-6 rounded-lg text-left mb-6">
                    <h3 class="font-semibold text-lg mb-3">${getTranslation('summaryHeading')}</h3>
                    <ul class="space-y-2">
                        <li><span class="font-medium">${getTranslation('nameLabel')}</span> ${farmerData.name}</li>
                        <li><span class="font-medium">${getTranslation('locationLabel')}</span> ${farmerData.location}</li>
                        <li><span class="font-medium">${getTranslation('landSizeLabel')}</span> ${farmerData.landSize}</li>
                        <li><span class="font-medium">${getTranslation('cropLabel')}</span> ${farmerData.mainCrop}</li>
                        <li><span class="font-medium">${getTranslation('irrigationLabel')}</span> ${farmerData.irrigationMethod}</li>
                    </ul>
                </div>
                <div class="flex gap-2">
                    <button id="save-btn" class="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex-1">${getTranslation('saveProfile')}</button>
                    <button id="speak-summary-btn" class="bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">${getTranslation('speakInsteadButton')}</button>
                </div>
            </div>
        `;
        
        // Read summary aloud
        const summaryText = getTranslation('summaryText', farmerData);
        speakText(summaryText);
        
        document.getElementById('save-btn').addEventListener('click', saveFarmerDetails);
        
        // Add event listener for speak summary button
        document.getElementById('speak-summary-btn').addEventListener('click', () => {
            const summaryText = getTranslation('summaryText', farmerData);
            speakText(summaryText);
        });
    }

    async function saveFarmerDetails() {
        // Cancel any ongoing speech when saving
        stopSpeech();
        
        onboardingSection.innerHTML = `<h2 class="text-2xl font-bold text-green-700">${getTranslation('savingProfile')}</h2>`;
        speakText(getTranslation('savingProfile'));
        
        try {
            const res = await fetch(`/api/update-farmer/${farmerId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(farmerData),
            });
            if (!res.ok) throw new Error('Failed to save details');
            speakText(getTranslation('profileSaved'));
            setTimeout(() => {
                window.location.href = '/profile';
            }, 3000);
        } catch (error) {
            onboardingSection.innerHTML = `<h2 class="text-red-700">Error!</h2><p>${getTranslation('saveError')}</p>`;
            speakText(getTranslation('saveError'));
        }
    }

    // Initialize speech recognition
    initSpeechRecognition();
    
    // Start with language selection
    renderLanguageSelection();
});