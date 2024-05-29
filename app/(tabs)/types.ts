export type RootStackParamList = {
  MainMenu: undefined;
  ChessBoard: undefined;
};


export interface MainMenuProps {
  onContinue: () => void;
  onNewGame: () => void;
  onExit: () => void;
  hasSavedGame: boolean;
}
