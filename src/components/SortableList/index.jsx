import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PropTypes from "prop-types";
import styles from "./sortableList.module.css";
import { MdDragIndicator } from "react-icons/md";
import { useParams } from "react-router-dom";

const ItemType = "ITEM";

const DraggableItem = ({ item, index, moveItem }) => {
  const { idRacingBet } = useParams();
  const [, drag] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    
    <li
      className={styles.item}
      style={idRacingBet != 0 ? { background: "rgba(255, 255, 255, 0.1)" }: {}}
      ref={(node) => drag(drop(node))}
    >
      <p className={styles.position}>{item.position + 1}º</p>
      <div className={styles.line}></div>
      <div className={styles.dataPilot}>
        <p>{item.pilot.team}</p>
        <p>
          {item.pilot.number_pilot} {item.pilot.name}
        </p>
      </div>
      <div className={styles.boxIcon}>
        <MdDragIndicator />
      </div>
    </li>
  );
};

DraggableItem.propTypes = {
  item: PropTypes.shape({
    pilot: PropTypes.object.isRequired,
    position: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired,
};

const SortableList = ({ items, setItems, isMove }) => {
  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <ul className={styles.sortableList}>
      {items.map((item, index) => (
        <DraggableItem
          key={item.id}
          index={index}
          item={{ pilot: item, position: index }}
          moveItem={isMove ? moveItem : () => {}}
        />
      ))}
    </ul>
  );
};

SortableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  setItems: PropTypes.func.isRequired,
  isMove: PropTypes.bool,
};

const Sortable = ({ items, setItems, isMove }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <SortableList isMove={isMove} items={items} setItems={setItems} />
    </DndProvider>
  );
};

Sortable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  setItems: PropTypes.func.isRequired,
  isMove: PropTypes.bool,
};

export default Sortable;
