import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Ingredient, Recipe } from "@/types/reipe";
import { ErrorResponse } from "@/types/errors";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const Ingredients = ({
  newRecipe,
  setNewRecipe,
  errors,
}: {
  newRecipe: Omit<Recipe, "id">;
  setNewRecipe: Dispatch<SetStateAction<Omit<Recipe, "id">>>;
  errors: ErrorResponse;
}) => {
  const { t } = useTranslation();
  const units = t("dialog.units", { returnObjects: true }) as string[];

  const addIngredient = () => {
    setNewRecipe({
      ...newRecipe,
      ingredients: [
        ...newRecipe.ingredients,
        { id: Date.now().toString(), name: "", quantity: "", unit: "g" },
      ],
    });
  };

  const updateIngredient = (
    id: string,
    field: keyof Ingredient,
    value: string
  ) => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing) =>
        ing.id === id ? { ...ing, [field]: value } : ing
      ),
    }));
  };

  const removeIngredient = (id: string) => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((ing) => ing.id !== id),
    }));
  };

  return (
    <div className="space-y-2">
      <strong>{t("dialog.ingredients")}:</strong>
      {errors.ingredients && (
        <p className="text-red-600 text-sm">{errors.ingredients}</p>
      )}
      <div className="overflow-auto max-h-64">
        {newRecipe.ingredients.map(({ id, name, quantity, unit }) => (
          <div key={id} className="flex gap-2 items-center p-1">
            <Input
              placeholder={t("dialog.quantity")}
              value={quantity}
              onChange={(e) => updateIngredient(id, "quantity", e.target.value)}
              className="w-20"
            />
            <select
              value={unit}
              onChange={(e) => updateIngredient(id, "unit", e.target.value)}
              className="border rounded-md p-2 dark:bg-black"
            >
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            <Input
              placeholder={t("dialog.ingredient_name")}
              value={name}
              onChange={(e) => updateIngredient(id, "name", e.target.value)}
              className="flex-grow"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeIngredient(id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={addIngredient} className="mt-2">
        {t("dialog.addPlusIngredient")}
      </Button>
    </div>
  );
};

export default Ingredients;
