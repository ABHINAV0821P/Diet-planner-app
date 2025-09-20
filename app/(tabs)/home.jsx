import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Image, RefreshControl, Alert, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import EmptyState from "../../components/EmptyState";
import { useGlobalContext } from "../../context/GlobalProvider";
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import FilterBar from '../components/FilterBar';
const weeklyDietPlanFatLoss = {
  vegetarian: {
    Monday: [
      { id: '1', meal: 'Breakfast', items: ['Oatmeal', 'Banana', 'Almond Milk'] },
      { id: '2', meal: 'Lunch', items: ['Quinoa Salad', 'Broccoli'] },
      { id: '3', meal: 'Dinner', items: ['Lentil Soup', 'Sweet Potato', 'Asparagus'] },
      { id: '4', meal: 'Snacks', items: ['Greek Yogurt', 'Apple', 'Peanut Butter'] },
    ],
    Tuesday: [
      { id: '1', meal: 'Breakfast', items: ['Smoothie', 'Granola'] },
      { id: '2', meal: 'Lunch', items: ['Chickpea Salad', 'Spinach'] },
      { id: '3', meal: 'Dinner', items: ['Stuffed Peppers', 'Quinoa'] },
      { id: '4', meal: 'Snacks', items: ['Carrot Sticks', 'Hummus'] },
    ],
    Wednesday: [
      { id: '1', meal: 'Breakfast', items: ['Avocado Toast', 'Orange Juice'] },
      { id: '2', meal: 'Lunch', items: ['Vegetable Wrap', 'Mixed Greens'] },
      { id: '3', meal: 'Dinner', items: ['Vegetarian Chili', 'Brown Rice'] },
      { id: '4', meal: 'Snacks', items: ['Apple Slices', 'Almond Butter'] },
    ],
    Thursday: [
      { id: '1', meal: 'Breakfast', items: ['Fruit Salad', 'Greek Yogurt'] },
      { id: '2', meal: 'Lunch', items: ['Caprese Sandwich', 'Side Salad'] },
      { id: '3', meal: 'Dinner', items: ['Eggplant Parmesan', 'Spaghetti'] },
      { id: '4', meal: 'Snacks', items: ['Trail Mix'] },
    ],
    Friday: [
      { id: '1', meal: 'Breakfast', items: ['Pancakes', 'Maple Syrup', 'Berries'] },
      { id: '2', meal: 'Lunch', items: ['Vegetarian Sushi', 'Edamame'] },
      { id: '3', meal: 'Dinner', items: ['Tofu Stir-fry', 'Brown Rice'] },
      { id: '4', meal: 'Snacks', items: ['Smoothie Bowl'] },
    ],
    Saturday: [
      { id: '1', meal: 'Breakfast', items: ['French Toast', 'Strawberries', 'Maple Syrup'] },
      { id: '2', meal: 'Lunch', items: ['Falafel Wrap', 'Tahini Sauce'] },
      { id: '3', meal: 'Dinner', items: ['Vegetable Curry', 'Naan'] },
      { id: '4', meal: 'Snacks', items: ['Baked Chips', 'Salsa'] },
    ],
    Sunday: [
      { id: '1', meal: 'Breakfast', items: ['Egg Muffins', 'Spinach', 'Cheese'] },
      { id: '2', meal: 'Lunch', items: ['Grilled Cheese', 'Tomato Soup'] },
      { id: '3', meal: 'Dinner', items: ['Vegetable Stew', 'Whole Grain Bread'] },
      { id: '4', meal: 'Snacks', items: ['Fruit Smoothie'] },
    ],
  },
  nonVegetarian: {
    Monday: [
      { id: '1', meal: 'Breakfast', items: ['Scrambled Eggs', 'Toast', 'Orange Juice'] },
      { id: '2', meal: 'Lunch', items: ['Grilled Chicken', 'Quinoa', 'Broccoli'] },
      { id: '3', meal: 'Dinner', items: ['Salmon', 'Sweet Potato', 'Asparagus'] },
      { id: '4', meal: 'Snacks', items: ['Greek Yogurt', 'Apple', 'Peanut Butter'] },
    ],
    Tuesday: [
      { id: '1', meal: 'Breakfast', items: ['Scrambled Eggs', 'Toast', 'Orange Juice'] },
      { id: '2', meal: 'Lunch', items: ['Turkey Sandwich', 'Carrot Sticks', 'Hummus'] },
      { id: '3', meal: 'Dinner', items: ['Grilled Shrimp', 'Brown Rice', 'Green Beans'] },
      { id: '4', meal: 'Snacks', items: ['Mixed Nuts', 'Berries'] },
    ],
    Wednesday: [
      { id: '1', meal: 'Breakfast', items: ['Greek Yogurt', 'Granola', 'Honey'] },
      { id: '2', meal: 'Lunch', items: ['Chicken Salad', 'Whole Grain Bread'] },
      { id: '3', meal: 'Dinner', items: ['Beef Stir Fry', 'Vegetables', 'Brown Rice'] },
      { id: '4', meal: 'Snacks', items: ['Fruit Salad'] },
    ],
    Thursday: [
      { id: '1', meal: 'Breakfast', items: ['Smoothie', 'Almond Butter Toast'] },
      { id: '2', meal: 'Lunch', items: ['Veggie Wrap', 'Side Salad'] },
      { id: '3', meal: 'Dinner', items: ['Baked Cod', 'Quinoa', 'Steamed Vegetables'] },
      { id: '4', meal: 'Snacks', items: ['Cottage Cheese', 'Peach'] },
    ],
    Friday: [
      { id: '1', meal: 'Breakfast', items: ['Pancakes', 'Berries', 'Maple Syrup'] },
      { id: '2', meal: 'Lunch', items: ['Tuna Salad', 'Crackers'] },
      { id: '3', meal: 'Dinner', items: ['Chicken Fajitas', 'Bell Peppers', 'Onions'] },
      { id: '4', meal: 'Snacks', items: ['Trail Mix'] },
    ],
    Saturday: [
      { id: '1', meal: 'Breakfast', items: ['French Toast', 'Strawberries', 'Maple Syrup'] },
      { id: '2', meal: 'Lunch', items: ['BLT Sandwich', 'Sweet Potato Fries'] },
      { id: '3', meal: 'Dinner', items: ['Turkey Meatloaf', 'Green Beans', 'Mashed Potatoes'] },
      { id: '4', meal: 'Snacks', items: ['Yogurt', 'Honey', 'Almonds'] },
    ],
    Sunday: [
      { id: '1', meal: 'Breakfast', items: ['Egg Muffins', 'Spinach', 'Cheese'] },
      { id: '2', meal: 'Lunch', items: ['Grilled Cheese', 'Tomato Soup'] },
      { id: '3', meal: 'Dinner', items: ['BBQ Chicken', 'Corn on the Cob', 'Salad'] },
      { id: '4', meal: 'Snacks', items: ['Fruit Smoothie'] },
    ],
  }
};

const weeklyDietPlanWeightGain = {
  vegetarian: {
    Monday: [
      { id: '1', meal: 'Breakfast', items: ['Avocado Toast', 'Orange Juice'] },
      { id: '2', meal: 'Lunch', items: ['Vegetarian Burrito', 'Rice', 'Beans'] },
      { id: '3', meal: 'Dinner', items: ['Pasta', 'Vegetable Stir-fry'] },
      { id: '4', meal: 'Snacks', items: ['Protein Shake', 'Nuts', 'Cheese'] },
    ],
    Tuesday: [
      { id: '1', meal: 'Breakfast', items: ['Smoothie', 'Granola'] },
      { id: '2', meal: 'Lunch', items: ['Chickpea Salad', 'Spinach'] },
      { id: '3', meal: 'Dinner', items: ['Stuffed Peppers', 'Quinoa'] },
      { id: '4', meal: 'Snacks', items: ['Carrot Sticks', 'Hummus'] },
    ],
    Wednesday: [
      { id: '1', meal: 'Breakfast', items: ['Bagel', 'Cream Cheese', 'Fruit'] },
      { id: '2', meal: 'Lunch', items: ['Vegetable Wrap', 'Mixed Greens'] },
      { id: '3', meal: 'Dinner', items: ['Vegetarian Chili', 'Brown Rice'] },
      { id: '4', meal: 'Snacks', items: ['Apple Slices', 'Almond Butter'] },
    ],
    Thursday: [
      { id: '1', meal: 'Breakfast', items: ['Fruit Salad', 'Greek Yogurt'] },
      { id: '2', meal: 'Lunch', items: ['Caprese Sandwich', 'Side Salad'] },
      { id: '3', meal: 'Dinner', items: ['Eggplant Parmesan', 'Spaghetti'] },
      { id: '4', meal: 'Snacks', items: ['Trail Mix'] },
    ],
    Friday: [
      { id: '1', meal: 'Breakfast', items: ['Pancakes', 'Maple Syrup', 'Berries'] },
      { id: '2', meal: 'Lunch', items: ['Vegetarian Sushi', 'Edamame'] },
      { id: '3', meal: 'Dinner', items: ['Tofu Stir-fry', 'Brown Rice'] },
      { id: '4', meal: 'Snacks', items: ['Smoothie Bowl'] },
    ],
    Saturday: [
      { id: '1', meal: 'Breakfast', items: ['French Toast', 'Strawberries', 'Maple Syrup'] },
      { id: '2', meal: 'Lunch', items: ['Falafel Wrap', 'Tahini Sauce'] },
      { id: '3', meal: 'Dinner', items: ['Vegetable Curry', 'Naan'] },
      { id: '4', meal: 'Snacks', items: ['Baked Chips', 'Salsa'] },
    ],
    Sunday: [
      { id: '1', meal: 'Breakfast', items: ['Egg Muffins', 'Spinach', 'Cheese'] },
      { id: '2', meal: 'Lunch', items: ['Grilled Cheese', 'Tomato Soup'] },
      { id: '3', meal: 'Dinner', items: ['Vegetable Stew', 'Whole Grain Bread'] },
      { id: '4', meal: 'Snacks', items: ['Fruit Smoothie'] },
    ],
  },
  nonVegetarian: {
    Monday: [
      { id: '1', meal: 'Breakfast', items: ['Eggs', 'Avocado Toast', 'Orange Juice'] },
      { id: '2', meal: 'Lunch', items: ['Steak', 'Mashed Potatoes', 'Green Beans'] },
      { id: '3', meal: 'Dinner', items: ['Pasta', 'Meatballs', 'Caesar Salad'] },
      { id: '4', meal: 'Snacks', items: ['Protein Shake', 'Nuts', 'Cheese'] },
    ],
    Tuesday: [
      { id: '1', meal: 'Breakfast', items: ['Greek Yogurt', 'Granola', 'Honey'] },
      { id: '2', meal: 'Lunch', items: ['Chicken Salad', 'Whole Grain Bread'] },
      { id: '3', meal: 'Dinner', items: ['Beef Stir Fry', 'Vegetables', 'Brown Rice'] },
      { id: '4', meal: 'Snacks', items: ['Fruit Salad'] },
    ],
    Wednesday: [
      { id: '1', meal: 'Breakfast', items: ['Smoothie', 'Almond Butter Toast'] },
      { id: '2', meal: 'Lunch', items: ['Veggie Wrap', 'Side Salad'] },
      { id: '3', meal: 'Dinner', items: ['Baked Cod', 'Quinoa', 'Steamed Vegetables'] },
      { id: '4', meal: 'Snacks', items: ['Cottage Cheese', 'Peach'] },
    ],
    Thursday: [
      { id: '1', meal: 'Breakfast', items: ['Scrambled Eggs', 'Toast', 'Orange Juice'] },
      { id: '2', meal: 'Lunch', items: ['Turkey Sandwich', 'Carrot Sticks', 'Hummus'] },
      { id: '3', meal: 'Dinner', items: ['Grilled Shrimp', 'Brown Rice', 'Green Beans'] },
      { id: '4', meal: 'Snacks', items: ['Mixed Nuts', 'Berries'] },
    ],
    Friday: [
      { id: '1', meal: 'Breakfast', items: ['Pancakes', 'Berries', 'Maple Syrup'] },
      { id: '2', meal: 'Lunch', items: ['Tuna Salad', 'Crackers'] },
      { id: '3', meal: 'Dinner', items: ['Chicken Fajitas', 'Bell Peppers', 'Onions'] },
      { id: '4', meal: 'Snacks', items: ['Trail Mix'] },
    ],
    Saturday: [
      { id: '1', meal: 'Breakfast', items: ['French Toast', 'Strawberries', 'Maple Syrup'] },
      { id: '2', meal: 'Lunch', items: ['BLT Sandwich', 'Sweet Potato Fries'] },
      { id: '3', meal: 'Dinner', items: ['Turkey Meatloaf', 'Green Beans', 'Mashed Potatoes'] },
      { id: '4', meal: 'Snacks', items: ['Yogurt', 'Honey', 'Almonds'] },
    ],
    Sunday: [
      { id: '1', meal: 'Breakfast', items: ['Egg Muffins', 'Spinach', 'Cheese'] },
      { id: '2', meal: 'Lunch', items: ['Grilled Cheese', 'Tomato Soup'] },
      { id: '3', meal: 'Dinner', items: ['BBQ Chicken', 'Corn on the Cob', 'Salad'] },
      { id: '4', meal: 'Snacks', items: ['Fruit Smoothie'] },
    ],
  }
};
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Home = () => {
  const { user } = useGlobalContext();
  const [dietPlan, setDietPlan] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [planType, setPlanType] = useState("");
  const [mealType, setMealType] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [history, setHistory] = useState([]); // History state to manage back navigation
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  useEffect(() => {
    if (planType && mealType) {
      fetchDietPlan(planType, mealType);
    }
  }, [planType, mealType]);

  const fetchDietPlan = (planType, mealType) => {
    let plan;
    if (planType === "fatLoss") {
      plan = weeklyDietPlanFatLoss;
    } else if (planType === "weightGain") {
      plan = weeklyDietPlanWeightGain;
    }
    setDietPlan(plan[mealType]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (planType && mealType) {
      fetchDietPlan(planType, mealType);
    }
    setRefreshing(false);
  };

  const handlePress = (meal) => {
    Alert.alert(`You selected ${meal}`);
  };

  const renderDietItem = ({ item }) => {
    if (activeFilter && item.meal !== activeFilter) {
      return null;
    }

    if (searchQuery && !item.items.some(foodItem => foodItem.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return null;
    }

    return (
      <TouchableOpacity 
        onPress={() => handlePress(item.meal)} 
        style={styles.dietItem}
      >
        <Text style={styles.mealText}>{item.meal}</Text>
        {item.items.map((foodItem, index) => (
          <Text key={index} style={styles.foodItemText}>
            {foodItem}
          </Text>
        ))}
      </TouchableOpacity>
    );
  };

  const handleBackButton = () => {
    if (mealType) {
      setMealType("");
      setHistory((prev) => prev.slice(0, -1)); // Remove last entry from history
    } else if (planType) {
      setPlanType("");
      setHistory([]);
    }
  };

  const handlePlanSelection = (type) => {
    setPlanType(type);
    setMealType("");
    setHistory([type]); // Push planType onto history
  };

  const handleMealSelection = (type) => {
    setMealType(type);
    setHistory((prev) => [...prev, type]); // Push mealType onto history
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.welcomeText}>Welcome Back,</Text>
          <Text style={styles.usernameText}>{user?.username}</Text>
          <Text style={styles.teamText}>Created by Team Gabbar</Text>
        </View>
        <Image
          source={images.logoSmall}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search meals..." 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity 
          onPress={() => setSearchQuery('')}
          style={styles.searchButton}
        >
          <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={() => handlePlanSelection("fatLoss")}
          style={[styles.planButton, planType === "fatLoss" && styles.activeButton]}
        >
          <Text style={styles.buttonText}>Fat Loss</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => handlePlanSelection("weightGain")}
          style={[styles.planButton, planType === "weightGain" && styles.activeButton]}
        >
          <Text style={styles.buttonText}>Weight Gain</Text>
        </TouchableOpacity>
      </View>
      {planType && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            onPress={() => handleMealSelection("vegetarian")}
            style={[styles.planButton, mealType === "vegetarian" && styles.activeButton]}
          >
            <Text style={styles.buttonText}>Vegetarian</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleMealSelection("nonVegetarian")}
            style={[styles.planButton, mealType === "nonVegetarian" && styles.activeButton]}
          >
            <Text style={styles.buttonText}>Non-Vegetarian</Text>
          </TouchableOpacity>
        </View>
      )}
      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <FlatList
        data={daysOfWeek}
        keyExtractor={(day) => day}
        renderItem={({ item: day }) => (
          <View style={styles.dayContainer}>
            <Text style={styles.dayText}>{day}</Text>
            <FlatList
              data={dietPlan[day]}
              keyExtractor={(item) => item.id}
              renderItem={renderDietItem}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#778899" // Light grey background for a clean look
  },
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 20 
  },
  backButton: { 
    padding: 2 
  },
  headerTextContainer: { 
    flex: 1, 
    alignItems: "center" 
  },
  welcomeText: { 
    fontSize: 25, 
    fontWeight: "700", 
    color: "#000000" 
  },
  usernameText: { 
    fontSize: 20, 
    color: "#ffffff" 
  },
  teamText: { 
    fontSize: 14, 
    color: "#c0c0c0" 
  },
  logo: { 
    width: 120, 
    height: 120 
  },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  searchInput: { 
    flex: 1, 
    padding: 10, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    marginRight: 10 
  },
  searchButton: { 
    padding: 10, 
    backgroundColor: '#000', 
    borderRadius: 8 
  },
  buttonContainer: { 
    flexDirection: "row", 
    justifyContent: "space-evenly", 
    marginVertical: 15 
  },
  planButton: { 
    flex: 1, 
    marginHorizontal: 5, 
    paddingVertical: 12, 
    backgroundColor: "#000000", // Primary color
    borderRadius: 8, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4 
  },
  activeButton: { 
    backgroundColor: "#FF5733" // Active button color
  },
  buttonText: { 
    textAlign: "center", 
    color: "#ffffff", 
    fontSize: 16 
  },
  dayContainer: { 
    marginBottom: 20 
  },
  dayText: { 
    fontSize: 20, 
    fontWeight: "700", 
    marginBottom: 10 
  },
  dietItem: { 
    padding: 10, 
    borderRadius: 8, 
    backgroundColor: "#ffffff", 
    marginVertical: 5 
  },
  mealText: { 
    fontSize: 18, 
    fontWeight: "600", 
    marginBottom: 5 
  },
  foodItemText: { 
    fontSize: 16 
  },
  separator: { 
    height: 1, 
    backgroundColor: "#cccccc" 
  },
  listContent: { 
    paddingBottom: 20 
  }
});

export default Home;
