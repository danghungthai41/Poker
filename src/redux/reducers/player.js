let initialState = {
  playerList: [
    {
      username: "Player 1",
      email: "player1@gmail.com",
      phone: "1829839030",
      totalPoint: 25000,
      cards: [],
    },
    {
      username: "Player 2",
      email: "player2@gmail.com",
      phone: "8849839939",
      totalPoint: 25000,
      cards: [],
    },
    {
      username: "Player 3",
      email: "player3@gmail.com",
      phone: "894589485",
      totalPoint: 25000,
      cards: [],
    },
  ],
};

const checkSpecialCase = (cards) => {
  const specialCase = ["KING", "JACK", "QUEEN"];
  if (!specialCase.includes(cards.value)) {
    return false;
  }
  return true;
};

const mapCardToPoint = (card) => {
  const specialCase = ["KING", "JACK", "QUEEN"];
  if (specialCase.includes(card.value)) return 10;
  if (card.value === "ACE") return 1;
  return +card.value;
};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_PLAYER":
      state.playerList = [...state.playerList, payload];
      return { ...state };
    case "DRAW_CARD":
      const totalPlayer = state.playerList.length;
      const clonePlayerList = [...state.playerList];
      for (let index in payload) {
        const indexPlayer = index % totalPlayer;
        clonePlayerList[indexPlayer].cards.push(payload[index]);
      }
      for (let player of clonePlayerList) {
        player.totalPoint -= 5000;
      }
      return { ...state, playerList: clonePlayerList };
    case "REVEAL_CARDS": {
      const specialCase = [];
      let max = 0;
      let maxPlayers = [];
      const clonePlayerList = [...state.playerList];
      for (let player of clonePlayerList) {
        if (checkSpecialCase(player.cards)) {
          specialCase.push(player);
        } else {
          let totalPoint = player.cards.reduce((total, card) => {
            return total + mapCardToPoint(card);
          }, 0);

          totalPoint %= 10;
          console.log(totalPoint);
          if (totalPoint > max) {
            max = totalPoint;
            maxPlayers = [player];
          } else if (max === totalPoint) {
            maxPlayers.push(player);
          }
        }
      }

      const winners = specialCase.length ? specialCase : maxPlayers;
      const winPoint = 20000 / winners.length;
      for (let index in clonePlayerList) {
        const foundedPlayer = winners.find(
          (winner) => winner.username === clonePlayerList[index].username
        );
        if (foundedPlayer) {
          clonePlayerList[index].totalPoint += winPoint;
        }
      }
      return { ...state, playerList: clonePlayerList };
    }
    case "RESHUFFLE_CARDS": {
      const clonePlayerList = [...state.playerList];
      // clonePlayerList.map((item) => {
      //   item.cards = [];
      // });
      console.log(state);
      for (let player of clonePlayerList) {
        player.cards = [];
      }
      return { ...state, playerList: clonePlayerList };
    }

    default:
      return state;
  }
};

export default reducer;
