import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { RecipeDetailsPage } from "../pages/RecipeDetailsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes/:recipeId" element={<RecipeDetailsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
