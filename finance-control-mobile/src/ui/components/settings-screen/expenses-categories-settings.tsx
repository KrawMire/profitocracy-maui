import { Layout, Text, Modal, Input, Toggle, Button, Card } from "@ui-kitten/components";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import AppState from "src/domain/app-state/app-state";
import ExpenseCategory from "src/domain/expense-category/expense-category";
import { addExpenseCategory } from "state/app-settings/actions";
import { settingsScreenStyles } from "styles/screens/settings.style";
import { getNewId } from "utils/identifier";
import { isNullOrZero } from "utils/null-check";
import { expensesCategoriesSettingsStyle } from "styles/components/settings-screen/expenses-categories-settings";
import { Vibration, View } from "react-native";

export function ExpensesCategoriesSettings() {
  const dispatch = useDispatch();
  const categories = useSelector((state: AppState) => state.settings.settings.expenseCategoriesSettings.categories);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryAmount, setNewCategoryAmount] = useState("");
  const [trackNewCategory, setTrackNewCategory] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleModal = () => {
    setShowAddModal(!showAddModal);
  };

  const addNewCategory = () => {
    const parsedAmount = Number(newCategoryAmount);

    if (!newCategoryName || newCategoryName === "") {
      showMessage({
        message: "Invalid category name!",
        type: "danger",
      });
      Vibration.vibrate();

      return;
    }

    if (isNullOrZero(parsedAmount)) {
      showMessage({
        message: "Invalid new category amount!",
        type: "danger",
      });
      Vibration.vibrate();

      return;
    }

    const newCategory: ExpenseCategory = {
      id: getNewId(),
      name: newCategoryName,
      plannedAmount: parsedAmount,
      trackExpenses: trackNewCategory,
    };

    Vibration.vibrate();
    dispatch(addExpenseCategory(newCategory));
    toggleModal();
  };

  const isCategoriesExists = categories && categories.length > 0;
  return (
    <Layout>
      {isCategoriesExists ? (
        categories.map((category) => (
          <Card key={category.id}>
            <Text>{category.name}</Text>
            <Text>Planned amount: {category.plannedAmount}</Text>
            <Text>Track: {category.trackExpenses ? "Yes" : "No"}</Text>
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
        <Card
          header={<Text category="h3">Add new category</Text>}
          style={expensesCategoriesSettingsStyle.addCategoryCard}
        >
          <Input
            label="Category name"
            placeholder="Enter new category name..."
            value={newCategoryName}
            style={expensesCategoriesSettingsStyle.addCategoryInput}
            onChangeText={setNewCategoryName}
          />
          <Input
            label="Category amount"
            placeholder="Enter new category amount..."
            keyboardType="numeric"
            value={newCategoryAmount}
            style={expensesCategoriesSettingsStyle.addCategoryInput}
            onChangeText={setNewCategoryAmount}
          />
          <View style={expensesCategoriesSettingsStyle.trackExpensesToggle}>
            <Text>Track expenses:</Text>
            <Toggle checked={trackNewCategory} onChange={setTrackNewCategory} />
          </View>
          <Button onPress={addNewCategory} style={expensesCategoriesSettingsStyle.addCategoryButton}>
            Add category
          </Button>
        </Card>
      </Modal>
    </Layout>
  );
}
