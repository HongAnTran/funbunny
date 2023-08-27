import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import CardTask from "./CardTask";
// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

export default function Cards() {
  const [state, setState] = useState([
    {
      id: 1,
      title: "Cần làm",
      list: [],
    },
    {
      id: 2,
      title: "Đang làm",
      list: [],
    },
    {
      id: 3,
      title: "Đã hoàn thành",
      list: [],
    },
  ]);

  function onDragEnd(result) {
    /**
     * Moves an item from one list to another list.
     */
    const move = (
      source,
      destination,
      droppableSource,
      droppableDestination
    ) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      
      const [removed] = sourceClone.splice(droppableSource.index, 1);


      destClone.splice(droppableDestination.index, 0, removed);

      const result = {};
      result[droppableSource.droppableId] = sourceClone;
      result[droppableDestination.droppableId] = destClone;

      return result;
    };

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = Number(source.droppableId) - 1;
    const dInd = Number(destination.droppableId) - 1;
    if (sInd === dInd) {
      const items = reorder(state[sInd].list, source.index, destination.index);
      const newState = [...state];
      newState[sInd].list = items;
      setState(newState);
    } else {
      const result = move(
        state[sInd].list,
        state[dInd].list,
        source,
        destination
      );
      const newState = [...state];
      newState[sInd].list = result[sInd + 1];
      newState[dInd].list = result[dInd + 1];
      setState(newState);
    }
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        {state.map((el) => (
          <CardTask el={el} key={el.id} />
        ))}
      </DragDropContext>
    </div>
  );
}
