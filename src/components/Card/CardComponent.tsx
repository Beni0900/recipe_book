import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Recipe } from "@/types/reipe";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

const CardComponent = ({
  r,
  setEditId,
  setRecipes,
}: {
  r: Recipe;
  setEditId: (value: string) => void;
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
}) => {
  const { t } = useTranslation();

  const handleDelete = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };
  return (
    <Card
      key={r.id}
      className="max-w-md shadow-md hover:shadow-lg transition-shadow duration-200 h-full"
    >
      <CardContent className="space-y-2 p-4 relative h-full">
        <h2 className="text-xl font-semibold">{r.title}</h2>
        <div>
          <strong>{t("card.ingredients")}:</strong>
          <ul className="list-disc list-inside pl-4">
            {r.ingredients.map((ing) => (
              <li key={ing.id}>
                {ing.quantity} {ing.unit} {ing.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong>{t("card.instructions")}:</strong>
          <br />
          <ul className="list-decimal list-inside pl-4">
            {r.instructions.map((instruction, index) => (
              <li key={index}>{instruction.description}</li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 absolute -bottom-3 right-4">
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setEditId(r.id)}
          >
            <Pencil size={16} className="mr-1" /> {t("card.edit")}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(r.id)}
          >
            <Trash2 size={16} className="mr-1" /> {t("card.delete")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
