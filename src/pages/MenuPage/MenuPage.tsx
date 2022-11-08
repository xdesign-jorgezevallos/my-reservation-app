import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { CloseOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import TemplateBase from "../../components/commons/TemplateBase/TemplateBase";
import { addDish, removeDish } from "../../store/dishes";
import { DishState } from "../../interfaces/dishType";

const styles= {
  root: {
    width: "60%",
    padding: "0 20%",
  },
  itemList: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
};

const initialDishState: DishState = {
  name: "",
  description: "",
  price: "",
};

export const MenuPage: React.FC = () => {

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const dishesList = useSelector((state: RootState) => state.dishes);

  const [dish, setDish] = useState<DishState>(initialDishState);

  const handleInputs = (e: any) => {
    e.preventDefault();
    if (e.target.name === "price") {
      setDish({
        ...dish,
        [e.target.name]: Number(e.target.value),
      });
    } else {
      setDish({
        ...dish,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleAddDish = (e: any) => {
    e.preventDefault();
    dispatch(addDish(dish));
    setDish(initialDishState);
  };

  const moveToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <TemplateBase>
      <div style={styles.root}>
        <h1 data-testid="title-page">Menu / Carta</h1>
        <br />
        <form onSubmit={handleAddDish}>
          <label>name:</label>
          <input
            type="text"
            name="name"
            value={dish.name}
            onChange={handleInputs}
          />
          <br />
          <label>description:</label>
          <input
            type="text"
            name="description"
            value={dish.description}
            onChange={handleInputs}
          />
          <br />
          <label>price:</label>
          <input
            type="number"
            name="price"
            value={dish.price}
            onChange={handleInputs}
          />
          <br />
          <input type="submit" value="+ add" />
        </form>
        <br />
        <br />

        {dishesList.dishes.map((dishItem, index: number) => (
          <div key={index} >
            <CloseOutlined
              color="error"
              onClick={() => {
                dispatch(removeDish(index));
              }}
            />
            <label>
              {dishItem.name} <b>&pound;{dishItem.price}</b>
            </label>
          </div>
        ))}

        {dishesList.dishes.length > 0 && (
          <div>
            <br />
            <div>
              <b style={{ color: "green", fontSize: "24px" }}>
                Total to pay: &pound;
                {dishesList.dishes
                  .map((item) => item.price)
                  .reduce(function (acc, val) {
                    return acc + val;
                  })}
              </b>
            </div>
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={moveToCheckout}
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </TemplateBase>
  );
};
