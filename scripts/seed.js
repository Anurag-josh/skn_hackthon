const mongoose = require('mongoose');
const Crop = require('../models/Crop');
const CropTask = require('../models/CropTask');

const MONGO_URI = 'mongodb://127.0.0.1:27017/framfriend';

// This is a helper function to create consistent keys from text
const key = (str) => str.toLowerCase().replace(/\s*\([^)]*\)\s*/g, '').replace(/[^a-z0-9]+/g, '_').replace(/_$/, '').replace(/_+/g, '_');

const seedData = async () => {
    await mongoose.connect(MONGO_URI);
    await Crop.deleteMany({});
    await CropTask.deleteMany({});

    console.log('Cleared existing data. Seeding new data with translation keys...');

    // --- 1. DEFINE CROPS ---
    const cropsToSeed = [
        { crop_name: "Rice (Paddy)", variety: "Mundakan Season", avg_duration_days: 120 },
        { crop_name: "Coconut", variety: "West Coast Tall", avg_duration_days: 3650 },
        { crop_name: "Rubber", variety: "RRII 105", avg_duration_days: 2555 },
        { crop_name: "Black Pepper", variety: "Panniyur-1", avg_duration_days: 1095 },
        { crop_name: "Banana", variety: "Nendran", avg_duration_days: 300 },
        { crop_name: "Ginger", variety: "Rio de Janeiro", avg_duration_days: 240 },
        { crop_name: "Turmeric", variety: "Prathibha", avg_duration_days: 210 },
        { crop_name: "Tapioca (Cassava)", variety: "Sree Vijaya (H-226)", avg_duration_days: 300 },
        { crop_name: "Cardamom", variety: "Malabar", avg_duration_days: 1095 },
        { crop_name: "Bitter Gourd", variety: "Preethi", avg_duration_days: 120 },
        { crop_name: "Okra (Lady's Finger)", variety: "Arka Anamika", avg_duration_days: 90 },
        { crop_name: "Tomato", variety: "Shakthi", avg_duration_days: 140 },
        { crop_name: "Cucumber", variety: "Arunima", avg_duration_days: 80 },
        { crop_name: "Elephant Foot Yam", variety: "Gajendra", avg_duration_days: 240 },
        { crop_name: "Pineapple", variety: "Kew", avg_duration_days: 540 },
        { crop_name: "Jackfruit", variety: "All Season", avg_duration_days: 1825 },
        { crop_name: "Mango", variety: "Neelam", avg_duration_days: 1825 },
        { crop_name: "Coffee", variety: "Robusta", avg_duration_days: 1460 },
        { crop_name: "Arecanut", variety: "Mangala", avg_duration_days: 1825 },
        { crop_name: "Nutmeg", variety: "Viswashree", avg_duration_days: 2555 }
    ];

    // --- 2. GENERATE AND SAVE CROPS (AND CREATE A MAP) ---
    const cropIdMap = {};
    const cropDocs = cropsToSeed.map(c => {
        const crop_id = `${key(c.crop_name)}_${key(c.variety)}_kerala`;
        // Store the generated ID with the original crop name as the key
        cropIdMap[c.crop_name] = crop_id;
        return {
            crop_id: crop_id,
            crop_name_key: `crop_${key(c.crop_name)}_name`,
            variety_key: `crop_${key(c.variety)}_variety`,
            avg_duration_days: c.avg_duration_days
        };
    });

    await Crop.insertMany(cropDocs);
    console.log('Crops created successfully with consistent IDs.');

    // --- 3. DEFINE TASKS WITH A REFERENCE TO THE ORIGINAL CROP NAME ---
    const tasksToSeed = [
        { crop_name_ref: "Rice (Paddy)", task_name_key: "task_rice_land_preparation_name", task_description_key: "task_rice_land_preparation_desc", days_after_sowing: -15, task_type: "Weeding" },
        { crop_name_ref: "Rice (Paddy)", task_name_key: "task_rice_basal_fertilizer_name", task_description_key: "task_rice_basal_fertilizer_desc", days_after_sowing: 0, task_type: "Fertilizer" },
        { crop_name_ref: "Rice (Paddy)", task_name_key: "task_rice_transplanting_name", task_description_key: "task_rice_transplanting_desc", days_after_sowing: 1, task_type: "Default" },
        { crop_name_ref: "Rice (Paddy)", task_name_key: "task_rice_first_weeding_name", task_description_key: "task_rice_first_weeding_desc", days_after_sowing: 20, task_type: "Weeding" },
        { crop_name_ref: "Rice (Paddy)", task_name_key: "task_rice_first_top_dressing_name", task_description_key: "task_rice_first_top_dressing_desc", days_after_sowing: 25, task_type: "Fertilizer" },
        { crop_name_ref: "Rice (Paddy)", task_name_key: "task_rice_pest_scouting_name", task_description_key: "task_rice_pest_scouting_desc", days_after_sowing: 40, task_type: "Pest Control" },
        { crop_name_ref: "Rice (Paddy)", task_name_key: "task_rice_second_top_dressing_name", task_description_key: "task_rice_second_top_dressing_desc", days_after_sowing: 50, task_type: "Fertilizer" },
        { crop_name_ref: "Rice (Paddy)", task_name_key: "task_rice_harvesting_name", task_description_key: "task_rice_harvesting_desc", days_after_sowing: 115, task_type: "Harvesting" },
        { crop_name_ref: "Coconut", task_name_key: "task_coconut_basin_opening_weeding_name", task_description_key: "task_coconut_basin_opening_weeding_desc", days_after_sowing: 0, task_type: "Weeding" },
        { crop_name_ref: "Coconut", task_name_key: "task_coconut_pre_monsoon_fertilization_name", task_description_key: "task_coconut_pre_monsoon_fertilization_desc", days_after_sowing: 15, task_type: "Fertilizer" },
        { crop_name_ref: "Coconut", task_name_key: "task_coconut_pest_control_rhinoceros_beetle_name", task_description_key: "task_coconut_pest_control_rhinoceros_beetle_desc", days_after_sowing: 30, task_type: "Pest Control" },
        { crop_name_ref: "Coconut", task_name_key: "task_coconut_post_monsoon_fertilization_name", task_description_key: "task_coconut_post_monsoon_fertilization_desc", days_after_sowing: 120, task_type: "Fertilizer" },
        { crop_name_ref: "Coconut", task_name_key: "task_coconut_irrigation_starts_name", task_description_key: "task_coconut_irrigation_starts_desc", days_after_sowing: 180, task_type: "Irrigation" },
        { crop_name_ref: "Coconut", task_name_key: "task_coconut_harvesting_cycle_name", task_description_key: "task_coconut_harvesting_cycle_desc", days_after_sowing: 365, task_type: "Harvesting" },
        { crop_name_ref: "Rubber", task_name_key: "task_rubber_fertilizer_application_name", task_description_key: "task_rubber_fertilizer_application_desc", days_after_sowing: 120, task_type: "Fertilizer" },
        { crop_name_ref: "Rubber", task_name_key: "task_rubber_disease_management_leaf_fall_name", task_description_key: "task_rubber_disease_management_leaf_fall_desc", days_after_sowing: 150, task_type: "Pest Control" },
        { crop_name_ref: "Rubber", task_name_key: "task_rubber_tapping_season_begins_name", task_description_key: "task_rubber_tapping_season_begins_desc", days_after_sowing: 240, task_type: "Harvesting" },
        { crop_name_ref: "Rubber", task_name_key: "task_rubber_rain_guarding_name", task_description_key: "task_rubber_rain_guarding_desc", days_after_sowing: 30, task_type: "Default" },
        { crop_name_ref: "Black Pepper", task_name_key: "task_black_pepper_planting_cuttings_name", task_description_key: "task_black_pepper_planting_cuttings_desc", days_after_sowing: 0, task_type: "Default" },
        { crop_name_ref: "Black Pepper", task_name_key: "task_black_pepper_mulching_name", task_description_key: "task_black_pepper_mulching_desc", days_after_sowing: 15, task_type: "Weeding" },
        { crop_name_ref: "Black Pepper", task_name_key: "task_black_pepper_first_fertilization_name", task_description_key: "task_black_pepper_first_fertilization_desc", days_after_sowing: 90, task_type: "Fertilizer" },
        { crop_name_ref: "Black Pepper", task_name_key: "task_black_pepper_training_vines_name", task_description_key: "task_black_pepper_training_vines_desc", days_after_sowing: 120, task_type: "Default" },
        { crop_name_ref: "Black Pepper", task_name_key: "task_black_pepper_disease_watch_quick_wilt_name", task_description_key: "task_black_pepper_disease_watch_quick_wilt_desc", days_after_sowing: 150, task_type: "Pest Control" },
        { crop_name_ref: "Black Pepper", task_name_key: "task_black_pepper_harvesting_name", task_description_key: "task_black_pepper_harvesting_desc", days_after_sowing: 240, task_type: "Harvesting" },
        { crop_name_ref: "Banana", task_name_key: "task_banana_planting_suckers_name", task_description_key: "task_banana_planting_suckers_desc", days_after_sowing: 0, task_type: "Default" },
        { crop_name_ref: "Banana", task_name_key: "task_banana_first_fertilizer_dose_name", task_description_key: "task_banana_first_fertilizer_dose_desc", days_after_sowing: 30, task_type: "Fertilizer" },
        { crop_name_ref: "Banana", task_name_key: "task_banana_de_suckering_name", task_description_key: "task_banana_de_suckering_desc", days_after_sowing: 60, task_type: "Weeding" },
        { crop_name_ref: "Banana", task_name_key: "task_banana_second_fertilizer_dose_name", task_description_key: "task_banana_second_fertilizer_dose_desc", days_after_sowing: 75, task_type: "Fertilizer" },
        { crop_name_ref: "Banana", task_name_key: "task_banana_propping_name", task_description_key: "task_banana_propping_desc", days_after_sowing: 180, task_type: "Default" },
        { crop_name_ref: "Banana", task_name_key: "task_banana_harvesting_name", task_description_key: "task_banana_harvesting_desc", days_after_sowing: 280, task_type: "Harvesting" },
        { crop_name_ref: "Ginger", task_name_key: "task_ginger_land_preparation_name", task_description_key: "task_ginger_land_preparation_desc", days_after_sowing: -10, task_type: "Default" },
        { crop_name_ref: "Ginger", task_name_key: "task_ginger_planting_rhizomes_name", task_description_key: "task_ginger_planting_rhizomes_desc", days_after_sowing: 0, task_type: "Default" },
        { crop_name_ref: "Ginger", task_name_key: "task_ginger_mulching_name", task_description_key: "task_ginger_mulching_desc", days_after_sowing: 5, task_type: "Weeding" },
        { crop_name_ref: "Ginger", task_name_key: "task_ginger_first_fertilization_name", task_description_key: "task_ginger_first_fertilization_desc", days_after_sowing: 45, task_type: "Fertilizer" },
        { crop_name_ref: "Ginger", task_name_key: "task_ginger_second_mulching_weeding_name", task_description_key: "task_ginger_second_mulching_weeding_desc", days_after_sowing: 60, task_type: "Weeding" },
        { crop_name_ref: "Ginger", task_name_key: "task_ginger_second_fertilization_name", task_description_key: "task_ginger_second_fertilization_desc", days_after_sowing: 90, task_type: "Fertilizer" },
        { crop_name_ref: "Ginger", task_name_key: "task_ginger_harvesting_name", task_description_key: "task_ginger_harvesting_desc", days_after_sowing: 220, task_type: "Harvesting" },
        { crop_name_ref: "Turmeric", task_name_key: "task_turmeric_planting_rhizomes_name", task_description_key: "task_turmeric_planting_rhizomes_desc", days_after_sowing: 0, task_type: "Default" },
        { crop_name_ref: "Turmeric", task_name_key: "task_turmeric_mulching_name", task_description_key: "task_turmeric_mulching_desc", days_after_sowing: 5, task_type: "Weeding" },
        { crop_name_ref: "Turmeric", task_name_key: "task_turmeric_first_fertilization_name", task_description_key: "task_turmeric_first_fertilization_desc", days_after_sowing: 45, task_type: "Fertilizer" },
        { crop_name_ref: "Turmeric", task_name_key: "task_turmeric_earthing_up_name", task_description_key: "task_turmeric_earthing_up_desc", days_after_sowing: 120, task_type: "Default" },
        { crop_name_ref: "Turmeric", task_name_key: "task_turmeric_harvesting_name", task_description_key: "task_turmeric_harvesting_desc", days_after_sowing: 200, task_type: "Harvesting" },
        { crop_name_ref: "Tapioca (Cassava)", task_name_key: "task_tapioca_planting_cuttings_name", task_description_key: "task_tapioca_planting_cuttings_desc", days_after_sowing: 0, task_type: "Default" },
        { crop_name_ref: "Tapioca (Cassava)", task_name_key: "task_tapioca_gap_filling_name", task_description_key: "task_tapioca_gap_filling_desc", days_after_sowing: 20, task_type: "Default" },
        { crop_name_ref: "Tapioca (Cassava)", task_name_key: "task_tapioca_first_fertilization_weeding_name", task_description_key: "task_tapioca_first_fertilization_weeding_desc", days_after_sowing: 60, task_type: "Fertilizer" },
        { crop_name_ref: "Tapioca (Cassava)", task_name_key: "task_tapioca_second_fertilization_name", task_description_key: "task_tapioca_second_fertilization_desc", days_after_sowing: 120, task_type: "Fertilizer" },
        { crop_name_ref: "Tapioca (Cassava)", task_name_key: "task_tapioca_harvesting_name", task_description_key: "task_tapioca_harvesting_desc", days_after_sowing: 270, task_type: "Harvesting" },
        { crop_name_ref: "Cardamom", task_name_key: "task_cardamom_planting_suckers_name", task_description_key: "task_cardamom_planting_suckers_desc", days_after_sowing: 0, task_type: "Default" },
        { crop_name_ref: "Cardamom", task_name_key: "task_cardamom_weeding_mulching_name", task_description_key: "task_cardamom_weeding_mulching_desc", days_after_sowing: 60, task_type: "Weeding" },
        { crop_name_ref: "Cardamom", task_name_key: "task_cardamom_fertilizer_application_name", task_description_key: "task_cardamom_fertilizer_application_desc", days_after_sowing: 90, task_type: "Fertilizer" },
        { crop_name_ref: "Cardamom", task_name_key: "task_cardamom_trashing_name", task_description_key: "task_cardamom_trashing_desc", days_after_sowing: 210, task_type: "Default" },
        { crop_name_ref: "Cardamom", task_name_key: "task_cardamom_harvesting_name", task_description_key: "task_cardamom_harvesting_desc", days_after_sowing: 730, task_type: "Harvesting" },
        { crop_name_ref: "Bitter Gourd", task_name_key: "task_bitter_gourd_sowing_seeds_name", task_description_key: "task_bitter_gourd_sowing_seeds_desc", days_after_sowing: 0, task_type: "Default" },
        { crop_name_ref: "Bitter Gourd", task_name_key: "task_bitter_gourd_trellis_pandal_setup_name", task_description_key: "task_bitter_gourd_trellis_pandal_setup_desc", days_after_sowing: 20, task_type: "Default" },
        { crop_name_ref: "Bitter Gourd", task_name_key: "task_bitter_gourd_first_fertilization_name", task_description_key: "task_bitter_gourd_first_fertilization_desc", days_after_sowing: 30, task_type: "Fertilizer" },
        { crop_name_ref: "Bitter Gourd", task_name_key: "task_bitter_gourd_pest_management_name", task_description_key: "task_bitter_gourd_pest_management_desc", days_after_sowing: 45, task_type: "Pest Control" },
        { crop_name_ref: "Bitter Gourd", task_name_key: "task_bitter_gourd_top_dressing_name", task_description_key: "task_bitter_gourd_top_dressing_desc", days_after_sowing: 60, task_type: "Fertilizer" },
        { crop_name_ref: "Bitter Gourd", task_name_key: "task_bitter_gourd_harvesting_starts_name", task_description_key: "task_bitter_gourd_harvesting_starts_desc", days_after_sowing: 70, task_type: "Harvesting" },
        { crop_name_ref: "Okra (Lady's Finger)", task_name_key: "task_okra_sowing_seeds_name", task_description_key: "task_okra_sowing_seeds_desc", days_after_sowing: 0, task_type: "Default" },
        { crop_name_ref: "Okra (Lady's Finger)", task_name_key: "task_okra_thinning_name", task_description_key: "task_okra_thinning_desc", days_after_sowing: 15, task_type: "Default" },
        { crop_name_ref: "Okra (Lady's Finger)", task_name_key: "task_okra_first_top_dressing_name", task_description_key: "task_okra_first_top_dressing_desc", days_after_sowing: 30, task_type: "Fertilizer" },
        { crop_name_ref: "Okra (Lady's Finger)", task_name_key: "task_okra_pest_watch_jassids_name", task_description_key: "task_okra_pest_watch_jassids_desc", days_after_sowing: 40, task_type: "Pest Control" },
        { crop_name_ref: "Okra (Lady's Finger)", task_name_key: "task_okra_harvesting_starts_name", task_description_key: "task_okra_harvesting_starts_desc", days_after_sowing: 50, task_type: "Harvesting" },
        { crop_name_ref: "Tomato", task_name_key: "task_tomato_nursery_sowing_name", task_description_key: "task_tomato_nursery_sowing_desc", days_after_sowing: 0, task_type: "Default" },
        { crop_name_ref: "Tomato", task_name_key: "task_tomato_transplanting_name", task_description_key: "task_tomato_transplanting_desc", days_after_sowing: 25, task_type: "Default" },
        { crop_name_ref: "Tomato", task_name_key: "task_tomato_staking_name", task_description_key: "task_tomato_staking_desc", days_after_sowing: 40, task_type: "Default" },
        { crop_name_ref: "Tomato", task_name_key: "task_tomato_first_fertilization_name", task_description_key: "task_tomato_first_fertilization_desc", days_after_sowing: 55, task_type: "Fertilizer" },
        { crop_name_ref: "Tomato", task_name_key: "task_tomato_disease_watch_bacterial_wilt_name", task_description_key: "task_tomato_disease_watch_bacterial_wilt_desc", days_after_sowing: 70, task_type: "Pest Control" },
        { crop_name_ref: "Tomato", task_name_key: "task_tomato_harvesting_starts_name", task_description_key: "task_tomato_harvesting_starts_desc", days_after_sowing: 90, task_type: "Harvesting" },
        { crop_name_ref: "Cucumber", task_name_key: "task_cucumber_sowing_seeds_name", task_description_key: "task_cucumber_sowing_seeds_desc", days_after_sowing: 0, task_type: "Default" },
        { crop_name_ref: "Cucumber", task_name_key: "task_cucumber_trellis_support_name", task_description_key: "task_cucumber_trellis_support_desc", days_after_sowing: 20, task_type: "Default" },
        { crop_name_ref: "Cucumber", task_name_key: "task_cucumber_fertilization_name", task_description_key: "task_cucumber_fertilization_desc", days_after_sowing: 30, task_type: "Fertilizer" },
        { crop_name_ref: "Cucumber", task_name_key: "task_cucumber_irrigation_name", task_description_key: "task_cucumber_irrigation_desc", days_after_sowing: 35, task_type: "Irrigation" },
        { crop_name_ref: "Cucumber", task_name_key: "task_cucumber_harvesting_name", task_description_key: "task_cucumber_harvesting_desc", days_after_sowing: 60, task_type: "Harvesting" },
        { crop_name_ref: "Elephant Foot Yam", task_name_key: "task_elephant_foot_yam_planting_corms_name", task_description_key: "task_elephant_foot_yam_planting_corms_desc", days_after_sowing: 0, task_type: "Default" },
        { crop_name_ref: "Elephant Foot Yam", task_name_key: "task_elephant_foot_yam_mulching_name", task_description_key: "task_elephant_foot_yam_mulching_desc", days_after_sowing: 10, task_type: "Weeding" },
        { crop_name_ref: "Elephant Foot Yam", task_name_key: "task_elephant_foot_yam_fertilization_earthing_up_name", task_description_key: "task_elephant_foot_yam_fertilization_earthing_up_desc", days_after_sowing: 60, task_type: "Fertilizer" },
        { crop_name_ref: "Elephant Foot Yam", task_name_key: "task_elephant_foot_yam_harvesting_name", task_description_key: "task_elephant_foot_yam_harvesting_desc", days_after_sowing: 220, task_type: "Harvesting" },
        { crop_name_ref: "Pineapple", task_name_key: "task_pineapple_planting_suckers_slips_name", task_description_key: "task_pineapple_planting_suckers_slips_desc", days_after_sowing: 0, task_type: "Default" },
        { crop_name_ref: "Pineapple", task_name_key: "task_pineapple_weed_control_name", task_description_key: "task_pineapple_weed_control_desc", days_after_sowing: 60, task_type: "Weeding" },
        { crop_name_ref: "Pineapple", task_name_key: "task_pineapple_fertilizer_application_name", task_description_key: "task_pineapple_fertilizer_application_desc", days_after_sowing: 90, task_type: "Fertilizer" },
        { crop_name_ref: "Pineapple", task_name_key: "task_pineapple_flower_induction_name", task_description_key: "task_pineapple_flower_induction_desc", days_after_sowing: 365, task_type: "Default" },
        { crop_name_ref: "Pineapple", task_name_key: "task_pineapple_harvesting_name", task_description_key: "task_pineapple_harvesting_desc", days_after_sowing: 500, task_type: "Harvesting" },
        { crop_name_ref: "Jackfruit", task_name_key: "task_jackfruit_basin_preparation_name", task_description_key: "task_jackfruit_basin_preparation_desc", days_after_sowing: 0, task_type: "Weeding" },
        { crop_name_ref: "Jackfruit", task_name_key: "task_jackfruit_fertilization_name", task_description_key: "task_jackfruit_fertilization_desc", days_after_sowing: 15, task_type: "Fertilizer" },
        { crop_name_ref: "Jackfruit", task_name_key: "task_jackfruit_pruning_name", task_description_key: "task_jackfruit_pruning_desc", days_after_sowing: 180, task_type: "Default" },
        { crop_name_ref: "Mango", task_name_key: "task_mango_fertilizer_application_name", task_description_key: "task_mango_fertilizer_application_desc", days_after_sowing: 90, task_type: "Fertilizer" },
        { crop_name_ref: "Mango", task_name_key: "task_mango_pest_management_hopper_name", task_description_key: "task_mango_pest_management_hopper_desc", days_after_sowing: 210, task_type: "Pest Control" },
        { crop_name_ref: "Mango", task_name_key: "task_mango_irrigation_name", task_description_key: "task_mango_irrigation_desc", days_after_sowing: 240, task_type: "Irrigation" },
        { crop_name_ref: "Coffee", task_name_key: "task_coffee_pruning_handling_name", task_description_key: "task_coffee_pruning_handling_desc", days_after_sowing: 0, task_type: "Default" },
        { crop_name_ref: "Coffee", task_name_key: "task_coffee_pre_monsoon_fertilization_name", task_description_key: "task_coffee_pre_monsoon_fertilization_desc", days_after_sowing: 90, task_type: "Fertilizer" },
        { crop_name_ref: "Coffee", task_name_key: "task_coffee_post_monsoon_fertilization_name", task_description_key: "task_coffee_post_monsoon_fertilization_desc", days_after_sowing: 240, task_type: "Fertilizer" },
        { crop_name_ref: "Coffee", task_name_key: "task_coffee_harvesting_name", task_description_key: "task_coffee_harvesting_desc", days_after_sowing: 300, task_type: "Harvesting" },
        { crop_name_ref: "Arecanut", task_name_key: "task_arecanut_fertilizer_application_name", task_description_key: "task_arecanut_fertilizer_application_desc", days_after_sowing: 240, task_type: "Fertilizer" },
        { crop_name_ref: "Arecanut", task_name_key: "task_arecanut_disease_control_mahali_name", task_description_key: "task_arecanut_disease_control_mahali_desc", days_after_sowing: 30, task_type: "Pest Control" },
        { crop_name_ref: "Arecanut", task_name_key: "task_arecanut_harvesting_season_name", task_description_key: "task_arecanut_harvesting_season_desc", days_after_sowing: 330, task_type: "Harvesting" },
        { crop_name_ref: "Nutmeg", task_name_key: "task_nutmeg_fertilizer_application_name", task_description_key: "task_nutmeg_fertilizer_application_desc", days_after_sowing: 15, task_type: "Fertilizer" },
        { crop_name_ref: "Nutmeg", task_name_key: "task_nutmeg_pruning_name", task_description_key: "task_nutmeg_pruning_desc", days_after_sowing: 180, task_type: "Default" },
        { crop_name_ref: "Nutmeg", task_name_key: "task_nutmeg_harvesting_name", task_description_key: "task_nutmeg_harvesting_desc", days_after_sowing: 270, task_type: "Harvesting" }
    ];

    // --- 4. MAP TASKS TO THEIR CORRECT CROP_ID AND SAVE ---
    const finalTaskDocs = tasksToSeed.map(task => {
        if (!cropIdMap[task.crop_name_ref]) {
            console.error(`Error: Could not find a matching crop ID for task with crop_name_ref: "${task.crop_name_ref}"`);
            return null; // Skip tasks that don't have a matching crop
        }
        return {
            ...task,
            crop_id: cropIdMap[task.crop_name_ref] // Use the map to get the correct, generated ID
        };
    }).filter(task => task !== null); // Filter out any null tasks

    await CropTask.insertMany(finalTaskDocs);
    console.log('Crop tasks created successfully with consistent keys.');
    
    console.log('Database seeded successfully!');
    mongoose.connection.close();
};

seedData().catch(err => {
    console.error('Seeding failed:', err);
    mongoose.connection.close();
});