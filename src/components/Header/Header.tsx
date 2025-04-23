import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";

const Header = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) => {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="text-tiny font-bold">{t("header.welcome")}</h1>
      <Input
        placeholder={t("header.welcome_serach")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
};

export default Header;
