import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const languages = Object.keys(i18n.services.resourceStore.data).map(
    (lang) => lang
  );
  return (
    <select
      value={i18n.language}
      onChange={(e) => {
        console.log(e.target.value);
        i18n.changeLanguage(e.target.value);
      }}
      className="border rounded-md p-2 dark:bg-black absolute top-4 right-20 scale-80"
    >
      {languages.map((u) => (
        <option key={u} value={u}>
          {u}
        </option>
      ))}
    </select>
  );
};

export default LanguageToggle;
