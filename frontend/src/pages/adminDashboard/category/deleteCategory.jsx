import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const handleActions = async (category, fetchCategories) => {
  try {
    // Call API to check for deletion constraints
    const response = await checkCategoryForDeletion(category._id);
    switch (response.data.action) {
      case "DELETE_WITH_SUBCATEGORY_UPDATE":
        // Show confirmation alert for updating subcategories
        if (
          window.confirm(
            `This category has the following subcategories:\n\n` +
              response.data.subcategories
                .map((subcat) => `- ${subcat.name}`)
                .join("\n") +
              `\n\nDo you want to set the parent category of all subcategories to null?` +
              `\n\nThis category might also have products associated with it, if you click OK those products will also be deleted`
          )
        ) {
          // If confirmed, call delete API with subcategory update
          await deleteCategory(category._id, true);
          fetchCategories();
        }
        break;

      case "CANNOT_DELETE":
        // Show toast with the provided message
        toast.error(response.data.message);
        break;

      case "DELETE_WITH_PRODUCTS":
        // Show confirmation alert for deleting category with products
        if (
          window.confirm(
            `This category has ${response.data.productCount} products associated with it.\n\nDo you want to delete the category along with all products?`
          )
        ) {
          // If confirmed, call delete API without subcategory update
          await deleteCategory(category._id);
          fetchCategories();
        }
        break;

      case "PROCEED_TO_DELETE":
        // Directly call the delete API without any subcategory update
        await deleteCategory(category._id);
        fetchCategories();
        break;

      default:
        toast.error("Unexpected response from server.");
        break;
    }
  } catch (error) {
    console.error("Error during category deletion process:", error);
    toast.error("An error occurred while attempting to delete the category.");
  }
};

// Function to check if a category can be deleted
const checkCategoryForDeletion = async (categoryId) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(
      `http://localhost:5000/admin/checkCategoryForDeletion/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error checking category for deletion:", error);
    throw error;
  }
};

// Function to delete category with optional subcategory nullification
const deleteCategory = async (categoryId, nullSubCategory = false) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.delete(
      `http://localhost:5000/admin/deleteCategory/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { nullSubCategory },
      }
    );

    if (response.status === 200) {
      toast.success("Category deleted successfully!");
      // Refresh categories or remove deleted category from state
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    toast.error("Failed to delete category.");
  }
};
