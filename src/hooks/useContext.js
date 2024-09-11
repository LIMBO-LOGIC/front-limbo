import { useContext } from "react";
import { RaceContext } from "../contexts/RaceProvider";

export default function useContexts() {
  return useContext(RaceContext)
}