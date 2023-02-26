import { useContext } from "react";
import {  Context } from "../useTerminalContext";
import type { TerminalContext } from "../useTerminalContext";

export const useTerminal = () => useContext<TerminalContext>(Context);
