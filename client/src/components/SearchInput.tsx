import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { IProduct } from "../interfaces";
import { SetStateAction, useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.5),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  marginLeft: 0,
  width: "90%",
  [theme.breakpoints.up("sm")]: {
    width: "60%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

interface Props {
  products: IProduct[];
  setDummy: React.Dispatch<SetStateAction<IProduct[]>>;
}

const SearchInput: React.FC<Props> = ({ products, setDummy }) => {
  const [value, setValue] = useState("");

  const handleSearch = (target: HTMLInputElement) => {
    if (target.value === "") return setDummy(() => products);
    else {
      setDummy(() =>
        products.filter((product) =>
          product.name.toLocaleLowerCase().includes(target.value.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    setValue(() => "");
  }, [products]);
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      <StyledInputBase
        placeholder="Buscar productos…"
        value={value}
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => {
          setValue(() => e.target.value);
          handleSearch(e.target as HTMLInputElement);
        }}
      />
    </Search>
  );
};

export default SearchInput;
