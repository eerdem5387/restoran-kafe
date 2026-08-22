import type { Category, MenuItem } from "@/lib/types";
import type { Locale } from "./types";

export function localizedCategory(
  category: Category,
  locale: Locale,
): Pick<Category, "name" | "description"> {
  if (locale === "en") {
    return {
      name: category.nameEn?.trim() || category.name,
      description: category.descriptionEn?.trim() || category.description,
    };
  }
  if (locale === "ar") {
    return {
      name: category.nameAr?.trim() || category.name,
      description: category.descriptionAr?.trim() || category.description,
    };
  }
  return { name: category.name, description: category.description };
}

export function localizedMenuItem(
  item: MenuItem,
  locale: Locale,
): Pick<MenuItem, "name" | "tags"> {
  if (locale === "en") {
    return {
      name: item.nameEn?.trim() || item.name,
      tags: item.tagsEn?.length ? item.tagsEn : item.tags,
    };
  }
  if (locale === "ar") {
    return {
      name: item.nameAr?.trim() || item.name,
      tags: item.tagsAr?.length ? item.tagsAr : item.tags,
    };
  }
  return { name: item.name, tags: item.tags };
}
