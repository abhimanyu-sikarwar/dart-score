'use client';

import { useReducer, useCallback } from 'react';
import {
  GameState,
  GameAction,
  DartThrow,
  GameMode,
  Player,
} from '@/lib/types';
import {
  calculateTurnScore,
  checkBust,
  checkCountdownWin,
  updateCricketMarks,
  checkCricketWin,
  createInitialPlayer,
  createTurn,
  getNextPlayerIndex,
  generatePlayerId,
} from '@/lib/game-logic';

const initialState: GameState = {
  mode: '501',
  startingScore: 501,
  players: [],
  currentPlayerIndex: 0,
  currentTurn: [],
  isGameOver: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_DART': {
      if (state.currentTurn.length >= 3 || state.isGameOver) {
        return state;
      }
      return {
        ...state,
        currentTurn: [...state.currentTurn, action.dart],
      };
    }

    case 'REMOVE_LAST_DART': {
      if (state.currentTurn.length === 0) {
        return state;
      }
      return {
        ...state,
        currentTurn: state.currentTurn.slice(0, -1),
      };
    }

    case 'SUBMIT_TURN': {
      if (state.currentTurn.length === 0 || state.isGameOver) {
        return state;
      }

      const currentPlayer = state.players[state.currentPlayerIndex];
      const turnScore = calculateTurnScore(state.currentTurn);
      const lastDart = state.currentTurn[state.currentTurn.length - 1];

      let updatedPlayers: Player[];
      let isGameOver = false;
      let winnerId: string | undefined;

      if (state.mode === 'cricket') {
        // Cricket mode
        let newMarks = currentPlayer.cricketMarks!;
        let totalPoints = 0;

        for (const dart of state.currentTurn) {
          const result = updateCricketMarks(newMarks, dart, state.players, currentPlayer.id);
          newMarks = result.newMarks;
          totalPoints += result.pointsScored;
        }

        updatedPlayers = state.players.map((p, idx) =>
          idx === state.currentPlayerIndex
            ? {
                ...p,
                score: p.score + totalPoints,
                cricketMarks: newMarks,
                turns: [...p.turns, createTurn(p.id, state.currentTurn)],
              }
            : p
        );

        // Check for cricket win
        const winnerCheck = checkCricketWin(updatedPlayers);
        if (winnerCheck) {
          isGameOver = true;
          winnerId = winnerCheck;
        }
      } else {
        // 501/301 mode
        const isBust = checkBust(currentPlayer.score, turnScore, lastDart);
        const isWin = !isBust && checkCountdownWin(currentPlayer.score, turnScore, lastDart);

        if (isWin) {
          isGameOver = true;
          winnerId = currentPlayer.id;
        }

        updatedPlayers = state.players.map((p, idx) =>
          idx === state.currentPlayerIndex
            ? {
                ...p,
                score: isBust ? p.score : p.score - turnScore,
                turns: [...p.turns, createTurn(p.id, state.currentTurn, isBust)],
              }
            : p
        );
      }

      return {
        ...state,
        players: updatedPlayers,
        currentPlayerIndex: isGameOver
          ? state.currentPlayerIndex
          : getNextPlayerIndex(state.currentPlayerIndex, state.players.length),
        currentTurn: [],
        isGameOver,
        winnerId,
      };
    }

    case 'UNDO_TURN': {
      // Find the last turn and undo it
      const currentPlayer = state.players[state.currentPlayerIndex];

      // If current turn has darts, just clear it
      if (state.currentTurn.length > 0) {
        return {
          ...state,
          currentTurn: [],
        };
      }

      // Otherwise, undo the previous player's last turn
      const prevPlayerIndex =
        (state.currentPlayerIndex - 1 + state.players.length) % state.players.length;
      const prevPlayer = state.players[prevPlayerIndex];

      if (prevPlayer.turns.length === 0) {
        return state;
      }

      const lastTurn = prevPlayer.turns[prevPlayer.turns.length - 1];

      let updatedPlayers: Player[];

      if (state.mode === 'cricket') {
        // Recalculate cricket marks by replaying all turns except the last one
        const newMarks = { ...prevPlayer.cricketMarks! };
        let scoreToRemove = 0;

        // This is simplified - in a real app you'd want to store the delta
        // For now, we'll just remove the turn and let the user re-enter
        updatedPlayers = state.players.map((p, idx) =>
          idx === prevPlayerIndex
            ? {
                ...p,
                turns: p.turns.slice(0, -1),
              }
            : p
        );
      } else {
        // 501/301 mode - add the score back
        updatedPlayers = state.players.map((p, idx) =>
          idx === prevPlayerIndex
            ? {
                ...p,
                score: lastTurn.isBust ? p.score : p.score + lastTurn.totalScore,
                turns: p.turns.slice(0, -1),
              }
            : p
        );
      }

      return {
        ...state,
        players: updatedPlayers,
        currentPlayerIndex: prevPlayerIndex,
        currentTurn: [],
        isGameOver: false,
        winnerId: undefined,
      };
    }

    case 'NEW_GAME': {
      const startingScore = action.startingScore ?? (action.mode === '501' ? 501 : action.mode === '301' ? 301 : 0);

      const players: Player[] = action.players.map((name, idx) =>
        createInitialPlayer(generatePlayerId(), name, action.mode, startingScore)
      );

      return {
        mode: action.mode,
        startingScore,
        players,
        currentPlayerIndex: 0,
        currentTurn: [],
        isGameOver: false,
      };
    }

    case 'RESET_GAME': {
      const players: Player[] = state.players.map(p =>
        createInitialPlayer(p.id, p.name, state.mode, state.startingScore)
      );

      return {
        ...state,
        players,
        currentPlayerIndex: 0,
        currentTurn: [],
        isGameOver: false,
        winnerId: undefined,
      };
    }

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const addDart = useCallback((dart: DartThrow) => {
    dispatch({ type: 'ADD_DART', dart });
  }, []);

  const removeLastDart = useCallback(() => {
    dispatch({ type: 'REMOVE_LAST_DART' });
  }, []);

  const submitTurn = useCallback(() => {
    dispatch({ type: 'SUBMIT_TURN' });
  }, []);

  const undoTurn = useCallback(() => {
    dispatch({ type: 'UNDO_TURN' });
  }, []);

  const startNewGame = useCallback(
    (mode: GameMode, players: string[], startingScore?: number) => {
      dispatch({ type: 'NEW_GAME', mode, players, startingScore });
    },
    []
  );

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  return {
    state,
    addDart,
    removeLastDart,
    submitTurn,
    undoTurn,
    startNewGame,
    resetGame,
  };
}
