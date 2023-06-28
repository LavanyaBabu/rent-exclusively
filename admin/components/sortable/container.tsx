import update from "immutability-helper";
import type { FC } from "react";
import React from "react";
import { useCallback, useState } from "react";
import { Card } from "./card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Footer from "../footer/footer";

const style = {
  width: 400
};

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

export interface ContainerProps {
  images: Array<{ id: number; imageUrl: string }>;
  saveOrder: (images: string[]) => void;
}

export const SortableContainer: FC<ContainerProps> = ({ images, saveOrder }) => {
  const [cards, setCards] = useState(images.map((image) => ({ id: image.id, text: image.imageUrl })));

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item]
        ]
      })
    );
  }, []);

  const renderCard = useCallback((card: { id: number; text: string }, index: number) => {
    return <Card key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard} />;
  }, []);

  console.log({ cards });

  const save = () => {
    saveOrder(cards.map((card) => card.id.toString()));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      <Footer save={save} />
    </DndProvider>
  );
};
