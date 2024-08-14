import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/theme";
import { DraggableCard } from "../components/DraggableCard";
import { Separator } from "@/components/ui/separator";

export interface Card {
  id: number;
  title: string;
  color: string;
}

export function Configuration() {
  const { theme } = useTheme();
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      title: "Categorias",
      color: theme === "dark" ? "#1E90FF" : "#FF3030",
    },
    {
      id: 2,
      title: "Apariencia",
      color: theme === "dark" ? "#32CD32" : "#1E90FF",
    },
    {
      id: 3,
      title: "Promociones",
      color: theme === "dark" ? "#FFD700" : "#32CD32",
    },
    {
      id: 4,
      title: "Espera",
      color: theme === "dark" ? "#FF3030" : "#FFD700",
    },
  ]);

  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedButton === null) {
      setSelectedButton(1);
      navigate("/configuration/categorias");
    }
  }, [selectedButton, navigate]);

  const handleCardClick = (cardId: number) => {
    setSelectedButton(cardId);
    switch (cardId) {
      case 1:
        navigate("/configuration/categorias");
        break;
      case 2:
        navigate("/configuration/apariencia");
        break;
      case 3:
        navigate("/configuration/promociones");
        break;
      case 4:
        navigate("/configuration/categorias");
        break;
      default:
        break;
    }
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const draggedCard = cards[dragIndex];
    const updatedCards = [...cards];
    updatedCards.splice(dragIndex, 1, updatedCards[hoverIndex]);
    updatedCards.splice(hoverIndex, 1, draggedCard);
    setCards(updatedCards);
  };

  useEffect(() => {
    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        color:
          theme === "dark" ? getDarkColor(card.id) : getLightColor(card.id),
      }))
    );
  }, [theme]);

  const getLightColor = (id: number): string => {
    switch (id) {
      case 1:
        return "#FF3030";
      case 2:
        return "#1E90FF";
      case 3:
        return "#32CD32";
      case 4:
        return "#FFD700";
      default:
        return "#FFFFFF";
    }
  };

  const getDarkColor = (id: number): string => {
    switch (id) {
      case 1:
        return "#1E90FF";
      case 2:
        return "#32CD32";
      case 3:
        return "#FFD700";
      case 4:
        return "#FF3030";
      default:
        return "#000000";
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col xl:flex-row gap-10">
        <div className="xl:w-1/5 h-full">
          <div className="flex xl:flex-col gap-4 xl:gap-0 h-full w-full">
            {cards.map((card, index) => (
              <DraggableCard
                key={card.id}
                id={card.id}
                title={card.title}
                color={card.color}
                index={index}
                moveCard={moveCard}
                onClick={() => handleCardClick(card.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:flex-grow h-full">
          <Outlet />
        </div>
      </div>
    </DndProvider>
  );
}
