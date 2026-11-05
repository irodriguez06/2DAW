import { render, screen } from "@testing-library/react";
import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import SongCard from "../Components/Songs/SongCard";
import type { TrackView } from "../Components/Songs/Types/TrackView";

describe("SongCard", () => {
  it("renders the values passed to it without depending on sample song literals", () => {
    const id = randomUUID();
    const track: TrackView = {
      title: `track-${id}`,
      artist: `artist-${id}`,
      duration: Math.floor(Math.random() * 1000) + 1,
      reproduccions: Math.floor(Math.random() * 10000),
    };

    render(<SongCard trackInfo={track} />);

    expect(
      screen.getByRole("heading", { level: 1, name: track.title }),
    ).toBeTruthy();
    expect(screen.getByText(track.artist)).toBeTruthy();
    expect(screen.getByText(String(track.duration))).toBeTruthy();
    expect(
      screen.getByText(`Total Reproduccions: ${track.reproduccions}`),
    ).toBeTruthy();
  });

  it("renders zero reproductions for dynamically generated track details", () => {
    const id = randomUUID();
    const track: TrackView = {
      title: `track-${id}`,
      artist: `artist-${id}`,
      duration: Math.floor(Math.random() * 1000) + 1,
      reproduccions: 0,
    };

    render(<SongCard trackInfo={track} />);

    expect(
      screen.getByRole("heading", { level: 1, name: track.title }),
    ).toBeTruthy();
    expect(screen.getByText(track.artist)).toBeTruthy();
    expect(screen.getByText(String(track.duration))).toBeTruthy();
    expect(
      screen.getByText(`Total Reproduccions: ${track.reproduccions}`),
    ).toBeTruthy();
  });
});
