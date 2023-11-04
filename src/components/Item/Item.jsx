import React, { useState } from "react";
import CheckBox from "../CheckBox/CheckBox";

const Item = ({ provided, img, index, clickedIndexes }) => {
  const [isOverlay, setIsOverlay] = useState(false);

  const handleMouseEnter = () => {
    setIsOverlay(true);
  };

  const handleMouseLeave = () => {
    setIsOverlay(false);
  };

  // Check if the clickedIndexes array includes the current index
  const isClicked = clickedIndexes.includes(index);
  console.log(isClicked);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`box h-56 w-56 rounded-lg`}
    >
      <img src={img} alt="" />
      {isOverlay || isClicked ? (
        <div>
          <CheckBox index={index} clickedIndexes={clickedIndexes} />
        </div>
      ) : null}
    </div>
  );
};

export default Item;
