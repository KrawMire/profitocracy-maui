import { Layout, Text, Modal, Input, Toggle, Button, Card } from "@ui-kitten/components";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "state/app-state";
import { Category } from "domain/category";
import { addNewCategory } from "state/categories/actions";
import { settingsScreenStyles } from "styles/screens/settings-screen.style";
import { isNullOrZero } from "utils/numbers/null-check";
import { categorySettingsStyle } from "styles/components/settings-screen/categories-settings.style";
import { Vibration, View } from "react-native";

export function ExpensesCategoriesSettings() {
  const dispatch = useDispatch();
  const categories = useSelector((state: AppState) => state.categories);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryAmount, setNewCategoryAmount] = useState("");
  const [trackNewCategory, setTrackNewCategory] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleModal = () => {
    setShowAddModal(!showAddModal);
  };

  const onAddNewCategory = () => {
    const parsedAmount = Number(newCategoryAmount);

    if (!newCategoryName || newCategoryName === "") {
      showMessage({
        message: "Invalid category name!",
        type: "danger",
      });
      Vibration.vibrate(0.1);

      return;
    }

    if (isNullOrZero(parsedAmount)) {
      showMessage({
        message: "Invalid new category amount!",
        type: "danger",
      });
      Vibration.vibrate(0.1);

      return;
    }

    const newCategory: Category = {
      name: newCategoryName,
      plannedAmount: parsedAmount,
      isTracking: trackNewCategory,
    };

    Vibration.vibrate(0.1);
    dispatch(addNewCategory(newCategory));
    toggleModal();
  };

  const isCategoriesExists = categories && categories.length > 0;
  return (
    <Layout>
      {isCategoriesExists ? (
        categories.map((category) => (
          <Card key={category.name}>
            <Text>{category.name}</Text>
            <Text>Planned amount: {category.plannedAmount}</Text>
            <Text>Track: {category.isTracking ? "Yes" : "No"}</Text>
          </Card>
        ))
      ) : (
        <Text>No expenses categories</Text>
      )}
      <Button onPress={toggleModal}>Add new category</Button>

      <Modal
        visible={showAddModal}
        backdropStyle={settingsScreenStyles.addCategoryModalBackdrop}
        onBackdropPress={toggleModal}
      >
        <Card header={<Text category="h3">Add new category</Text>} style={categorySettingsStyle.addCategoryCard}>
          <Input
            label="Category name"
            placeholder="Enter new category name..."
            value={newCategoryName}
            style={categorySettingsStyle.addCategoryInput}
            onChangeText={setNewCategoryName}
          />
          <Input
            label="Category amount"
            placeholder="Enter new category amount..."
            keyboardType="numeric"
            value={newCategoryAmount}
            style={categorySettingsStyle.addCategoryInput}
            onChangeText={setNewCategoryAmount}
          />
          <View style={categorySettingsStyle.trackExpensesToggle}>
            <Text>Track expenses:</Text>
            <Toggle checked={trackNewCategory} onChange={setTrackNewCategory} />
          </View>
          <Button onPress={onAddNewCategory} style={categorySettingsStyle.addCategoryButton}>
            Add category
          </Button>
        </Card>
      </Modal>
    </Layout>
  );
}
