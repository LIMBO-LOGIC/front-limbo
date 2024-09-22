import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Itens de exemplo
const initialItems = [
  { id: "1", content: "Item 1" },
  { id: "2", content: "Item 2" },
  { id: "3", content: "Item 3" },
  { id: "4", content: "Item 4" },
  { id: "5", content: "Item 5" },
];

export default function SortableList() {
  const [items, setItems] = useState(initialItems);

  const handleOnDragEnd = (result) => {
    console.log(result); // Verifique se o resultado está sendo retornado corretamente
    if (!result.destination) return;
  
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
  
    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {items.map(({ id, content }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                    
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: "10px",
                      margin: "5px 0",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #ddd",
                      ...provided.draggableProps.style,
                    }}
                  >
                    {console.log(id)}
                    {content}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
