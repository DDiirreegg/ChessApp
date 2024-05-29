declare module 'react-chessboard' {
  import { FC } from 'react';

  interface ChessboardProps {
    position?: string;
    onPieceDrop?: (sourceSquare: string, targetSquare: string) => boolean;
  }

  const Chessboard: FC<ChessboardProps>;
  export default Chessboard;
}
