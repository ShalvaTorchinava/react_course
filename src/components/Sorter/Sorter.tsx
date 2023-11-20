import Select from "react-select";
import { СategoriesProps } from "../../types/categores";
import { PageState } from "../../pages/Movies/Movies";

interface SorterProps {
  categories: СategoriesProps[];
  selectValue: СategoriesProps;
  setSelectValue(selectValue: СategoriesProps): void;
  clearData: () => void;
  page: number;
  setPage(page: number): void;
  filtersPage: number;
  setFiltersPage(filtersPage: number): void;
  setPageState(pageState: PageState): void
}

const Sorter = ({
  categories,
  selectValue,
  setSelectValue,
  clearData,
  page,
  setPage,
  filtersPage,
  setFiltersPage,
  setPageState
}: SorterProps) => {
  return (
    <Select
      options={categories}
      onChange={(e) => {
        if (selectValue !== e) {
          setPageState(PageState.loading)
          e && setSelectValue(e);
          clearData();
        }
        if (page > 1) {
          setPage(1);
        }
        if (filtersPage > 1) {
          setFiltersPage(1);
        }
      }}
      defaultValue={selectValue}
      styles={{
        control: (styles) => ({
          ...styles,
          backgroundColor: "#ffffff",
          borderColor: "unset",
          boxShadow: "unset",
          ":hover": {
            borderColor: "unset",
          },
        }),
        option: (styles, { isSelected, isFocused }) => {
          return {
            ...styles,
            backgroundColor: isSelected
              ? "#ffffff"
              : isFocused
              ? "#ffffff"
              : undefined,
            color: isSelected ? "#000000" : undefined,
            ":active": {
              ...styles[":active"],
              backgroundColor: isSelected ? "#ffffff" : undefined,
            },
          };
        },
      }}
    />
  );
};

export default Sorter;
