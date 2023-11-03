import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const App = () => {
  const [droppedImages, setDroppedImages] = useState([]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
  
    const items = [...droppedImages];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  
    setDroppedImages(items);
  };
  

  // ---------------



  const handleAddImage = () => {
    // Create an input element to allow the user to select multiple images
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
  
    // Add an event listener to handle file selection
    input.addEventListener("change", (e) => {
      const selectedFiles = Array.from(e.target.files);
  
      const newImages = [];
  
      selectedFiles.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
  
          reader.onload = (event) => {
            const imageUrl = event.target.result;
            newImages.push(imageUrl);
  
            // If all images have been processed, update the state
            if (newImages.length === selectedFiles.length) {
              setDroppedImages([...droppedImages, ...newImages]);
            }
          };
  
          reader.readAsDataURL(file);
        }
      });
    });
  
    // Trigger the file input dialog
    input.click();
  };
  

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropItem = (e, index) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
  
    const newImages = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
  
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
  
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          newImages.push(imageUrl);
          if (i === files.length - 1) {
            setDroppedImages([...droppedImages, ...newImages]);
          }
        };
  
        reader.readAsDataURL(file);
      }
    }
  
    const draggingIndex = e.dataTransfer.getData("text");
    if (draggingIndex !== "" && index === droppedImages.length) {
      const updatedImages = [...droppedImages];
      const draggingImage = updatedImages[draggingIndex];
      updatedImages.splice(draggingIndex, 1);
      updatedImages.splice(index, 0, draggingImage);
      setDroppedImages(updatedImages);
    }
  };
  


  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div
              className="grid grid-cols-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {droppedImages.map((item, i) => {
                return (
                  <Draggable key={i} draggableId={i.toString()} index={i}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="h-56 w-56 bg-red-500 m-3"
                      >
                        <img src={item} alt=""/>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              {/* last box */}
              <div
                className="box last-child bg-red-500 w-56 h-56"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDropItem(e, droppedImages.length)}
              >
                <div className="icon-and-functionality">
                  <span className="icon">Icon</span>
                  <button onClick={handleAddImage}>Do Something</button>
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
