import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header/Header";
import DialogComponent from "./components/Dialog/DialogComponent";
import { Recipe } from "./types/reipe";
import CardComponent from "./components/Card/CardComponent";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./components/ThemeToggle";
import LanguageToggle from "./components/LanguageToggle";

const MyRecipeBook: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  // LOCAL STORAGE LOAD EVENT
  const effectRan = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem("recipes");
    if (stored) setRecipes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (effectRan.current) {
      localStorage.setItem("recipes", JSON.stringify(recipes));
    } else {
      effectRan.current = true;
    }
  }, [recipes]);

  // LOCAL STORAGE LOAD EVENT END

  // TITLE SEARCH FUNCTION
  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="m-auto p-4 space-y-6 flex flex-col items-center mb-10 max-w-xl">
        <ThemeToggle />
        <LanguageToggle />
        <Header search={search} setSearch={setSearch} />

        <DialogComponent
          setRecipes={setRecipes}
          editId={editId}
          setEditId={setEditId}
        />
      </div>

      <div className="w-full p-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {filtered.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <CardComponent
                r={r}
                setEditId={setEditId}
                setRecipes={setRecipes}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MyRecipeBook;
