import { useQuery } from "@tanstack/react-query";
import { get_all_categories } from "../services/categoryService";
import type { CategoryWithID } from "../types/Category";
export const useCategories = () => {
  // Fetch categories
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<CategoryWithID[], Error>({
    queryKey: ["categories"],
    queryFn: get_all_categories,
  });

  return {
    categories,
    isLoading,
    error,
  };
};
