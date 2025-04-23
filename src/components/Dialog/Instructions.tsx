import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Recipe } from "@/types/reipe";
import { ErrorResponse } from "@/types/errors";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const Instructions = ({
  newRecipe,
  setNewRecipe,
  errors,
}: {
  newRecipe: Omit<Recipe, "id">;
  setNewRecipe: Dispatch<SetStateAction<Omit<Recipe, "id">>>;
  errors: ErrorResponse;
}) => {
  const { t } = useTranslation();
  const updateInstruction = (id: string, value: string) => {
    setNewRecipe((prev) => ({
      ...prev,
      instructions: prev.instructions.map((ing) =>
        ing.id === id ? { ...ing, description: value } : ing
      ),
    }));
  };

  const removeInstruction = (id: string) => {
    setNewRecipe((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((ing) => ing.id !== id),
    }));
  };

  const addInstruction = () => {
    setNewRecipe({
      ...newRecipe,
      instructions: [
        ...newRecipe.instructions,
        {
          id: Date.now().toString(),
          description: "",
        },
      ],
    });
  };

  return (
    <div className="space-y-2">
      <strong>{t("dialog.instructions")}:</strong>
      {errors.instructions && (
        <p className="text-red-600 text-sm">{errors.instructions}</p>
      )}
      <div className="overflow-auto max-h-64">
        {newRecipe.instructions.map(({ id, description }, index) => (
          <div key={id} className="flex gap-2 items-center p-1">
            <strong>{index + 1}:</strong>
            <Textarea
              placeholder={t("dialog.instructions")}
              value={description}
              onChange={(e) => updateInstruction(id, e.target.value)}
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeInstruction(id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={addInstruction} className="mt-2">
        {t("dialog.addPlusInstruction")}
      </Button>
    </div>
  );
};

export default Instructions;
