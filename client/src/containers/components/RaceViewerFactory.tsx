import * as React from "react";
import { RaceViewer } from "../../application/components/RaceViewer";
import { downloadRacesContainer } from "../logic/network/downloadRacesContainer";

export const RaceViewerFactory = () => (
  <RaceViewer downloadRaces={downloadRacesContainer} />
);
