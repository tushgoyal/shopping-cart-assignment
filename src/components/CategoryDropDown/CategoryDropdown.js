import React from "react";
import "./CategoryDropdown.scss";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory } from "../../redux/category/categoryAction";

//component used for screen width less than 768px to show side category as dropdown
export default function CategoryDropdown({ data }) {
  const dispatch = useDispatch();
  const selectedId = useSelector((state) => state.category.categoryId);

  const onClickCategory = (val) => {
    dispatch(setSelectedCategory(val));
  };

  return (
    <div className="category-dropdown">
      <select
        className="category-dropdown-select"
        value={selectedId}
        onChange={(e) => onClickCategory(e.target.value)}
      >
        <option value="" className="selected">
          All Category
        </option>
        {data.map((el) => (
          <option
            className="category-dropdown-option"
            value={el.id}
            key={el.id}
          >
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
}
