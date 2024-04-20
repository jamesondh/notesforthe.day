import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { CheckboxItem } from "../types";
import Checkbox from "./checkbox";

interface CheckboxesCoreProps {
  list: CheckboxItem[];
  handleCheckboxChange?: (itemName: string) => void;
  handleRemoveItem: (itemName: string) => void;
  onDragEnd: (result: DropResult) => void;
}

function CheckboxesCore({
  list,
  handleCheckboxChange,
  handleRemoveItem,
  onDragEnd,
}: CheckboxesCoreProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="cb">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {list.map((item, index) => (
              <Checkbox
                key={item.name}
                index={index}
                item={item}
                handleCheckboxChange={
                  handleCheckboxChange
                    ? () => handleCheckboxChange(item.name)
                    : undefined
                }
                handleRemoveItem={() => handleRemoveItem(item.name)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default CheckboxesCore;
