import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Recipe } from "@/types/reipe";
import { ErrorResponse } from "@/types/errors";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import { useTranslation } from "react-i18next";

const DialogComponent = ({
  setRecipes,
  editId,
  setEditId,
}: {
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
  editId: string | null;
  setEditId: (value: string | null) => void;
}) => {
  const { t } = useTranslation();
  const [newRecipe, setNewRecipe] = useState<Omit<Recipe, "id">>({
    title: "",
    ingredients: [],
    instructions: [],
  });
  const [errors, setErrors] = useState<ErrorResponse>({});
  const [open, setOpen] = useState(false);

  //EDIT ID DETECTION
  useEffect(() => {
    if (editId) {
      const recipe = JSON.parse(localStorage.getItem("recipes") || "[]").find(
        (r: Recipe) => r.id === editId
      );
      if (recipe) {
        setNewRecipe({
          title: recipe.title,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        });
        setOpen(true);
      }
    }
  }, [editId]);

  useEffect(() => {
    if (!open) setEditId(null);
  }, [open]);

  //HANDLE ADD OR UPDATE FUNCTION
  const handleAddOrUpdate = () => {
    const newErrors: typeof errors = {};

    if (!newRecipe.title.trim()) {
      newErrors.title = t("errors.title");
    }

    if (!newRecipe.ingredients.length) {
      newErrors.ingredients = t("errors.ingredients");
    } else {
      const invalidIngredient = newRecipe.ingredients.find(
        (ing) => !ing.name.trim() || !ing.quantity.trim() || !ing.unit.trim()
      );
      if (invalidIngredient) {
        newErrors.ingredients = t("errors.ingredients2");
      }
    }
    if (!newRecipe.instructions.length) {
      newErrors.instructions = t("errors.instructions");
    } else {
      const invalidInstruction = newRecipe.instructions.find(
        (inst) => !inst.description.trim()
      );
      if (invalidInstruction) {
        newErrors.instructions = t("errors.instructions2");
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (editId) {
      setRecipes((prev) =>
        prev.map((r) => (r.id === editId ? { ...r, ...newRecipe } : r))
      );
    } else {
      const id = Math.floor(Math.random() * 1000000).toString();
      setRecipes((prev) => [...prev, { id, ...newRecipe }]);
    }
    setNewRecipe({ title: "", ingredients: [], instructions: [] });
    setEditId(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="mt-4"
          onClick={() => {
            setNewRecipe({ title: "", ingredients: [], instructions: [] });
          }}
        >
          {t("dialog.newRecipe")}
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle>
          {editId ? t("dialog.editRecipe") : t("dialog.addRecipe")}
        </DialogTitle>
        <Input
          placeholder={t("dialog.title")}
          value={newRecipe.title}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, title: e.target.value })
          }
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
        <Ingredients
          newRecipe={newRecipe}
          setNewRecipe={setNewRecipe}
          errors={errors}
        />
        <Instructions
          newRecipe={newRecipe}
          setNewRecipe={setNewRecipe}
          errors={errors}
        />
        <Button onClick={handleAddOrUpdate} className=" m-auto mt-2 w-1/2">
          {editId ? t("dialog.button1") : t("dialog.button2")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
