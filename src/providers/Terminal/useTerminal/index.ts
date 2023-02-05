import { useContext } from "react";
import { TerminalContext, Context } from "../useTerminalContext";

export const useTerminal = () => useContext<TerminalContext>(Context);
