import "./App.css";
import { useEffect, useState } from "react";
import fruitItems from "./fruits.json";

/* Mỗi card có 3 prop:
  - fruit: loại trái cây đang chứa ở đó
  - flipped: trạng thái đã đc lật lên chưa
  - chooseCard(): hàm đc truyền vào để lấy thông tin fruit đc bốc trúng
*/
function Card({ fruit, flipped, chooseCard }) {
  const handleCardClick = (e) => {
    chooseCard(fruit);
  };

  return (
    <div
      className={`card ${flipped ? "matched" : ""}`}
      onClick={handleCardClick}
    >
      <img style={{ transform: "rotateY(180deg)" }} src={fruit.src} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-question-mark"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4"></path>
        <path d="M12 19l0 .01"></path>
      </svg>
    </div>
  );
}

export default function App() {
  const [fruits, setFruits] = useState([]);
  const [fruitOne, setFruitOne] = useState(null);
  const [fruitTwo, setFruitTwo] = useState(null);

  const chooseCard = (fruit) => {
    fruitOne ? setFruitTwo(fruit) : setFruitOne(fruit);
  };

  const initGame = () => {
    const allFruits = [...fruitItems, ...fruitItems]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, id: Math.random() }));

    setFruits(allFruits);
  };

  // Reset tất cả match về false
  const resetGame = () => {
    setFruits((prevFruits) => {
      return prevFruits.map((item) => {
        if (item.matched) {
          return { ...item, matched: false };
        }

        return item;
      });
    });

    setFruitOne(null);
    setFruitTwo(null);

    setTimeout(() => {
      initGame();
    }, 500);
  };

  useEffect(() => {
    if (fruitOne && fruitTwo) {
      // Nếu 2 fruit giống nhau, đổi state của cả 2 fruit đó thành match
      if (fruitOne.src === fruitTwo.src) {
        setFruits((prevFruits) => {
          return prevFruits.map((item) => {
            if (item.src === fruitOne.src) {
              return { ...item, matched: true };
            } else {
              return item;
            }
          });
        });
      }

      setTimeout(() => {
        setFruitOne(null);
        setFruitTwo(null);
      }, 500);
    }
  }, [fruitTwo, fruitOne]);

  return (
    <>
      <h1>Memory Game</h1>
      {fruits.length ? (
        <>
          <button className="reset" onClick={resetGame}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-reload"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path>
              <path d="M20 4v5h-5"></path>
            </svg>
          </button>
          <div className="game-block">
            {fruits.map((fruit, key) => {
              return (
                <Card
                  key={key}
                  fruit={fruit}
                  chooseCard={chooseCard}
                  // Card đc flip lên khi nó là card đang đc mở thứ nhất, thứ hai hoặc đã mở đúng trc đó rồi
                  flipped={
                    fruit === fruitOne || fruit === fruitTwo || fruit.matched
                  }
                />
              );
            })}
          </div>
        </>
      ) : (
        <button className="start-game" onClick={initGame}>
          Start Game
        </button>
      )}
    </>
  );
}
