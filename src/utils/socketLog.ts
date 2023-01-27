import {colorTerminal} from './consolLogger';
import { dateFormatter } from './dateFormatter';

export const SocketLog = (color:string, message :string) => {
  const startTime = colorTerminal('red',`[${dateFormatter(new Date().getTime(), true)}]`); 
  const resultMessage = colorTerminal(color, message);
  const result = `${startTime} ${resultMessage}`;
  return result;
};