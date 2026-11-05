import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { tracks } from "../Data/track";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("App", () => {
  it("renders the track and reproduction count calculated from random values", () => {
    const random = vi.spyOn(Math, "random");

    tracks.forEach((expectedTrack, index) => {
      const trackRoll = (index + 0.5) / tracks.length;
      const reproductionsRoll = (index + 1) / (tracks.length + 1);
      const expectedReproductions = Math.floor(reproductionsRoll * 10000);

      random
        .mockReturnValueOnce(trackRoll)
        .mockReturnValueOnce(reproductionsRoll);

      const { unmount } = render(<App />);

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: expectedTrack.title,
        }),
      ).toBeTruthy();
      expect(screen.getByText(expectedTrack.artist)).toBeTruthy();
      expect(screen.getByText(String(expectedTrack.duration))).toBeTruthy();
      expect(
        screen.getByText(`Total Reproduccions: ${expectedReproductions}`),
      ).toBeTruthy();

      unmount();
    });

    expect(random).toHaveBeenCalledTimes(tracks.length * 2);
  });

  it("keeps generated reproduction counts inside the application's range", () => {
    const random = vi.spyOn(Math, "random");
    const reproductionRolls = [0, Math.random(), 1 - Number.EPSILON];

    reproductionRolls.forEach((roll, index) => {
      random
        .mockReturnValueOnce(index / reproductionRolls.length)
        .mockReturnValueOnce(roll);

      const { unmount } = render(<App />);
      const displayedCount = Number(
        screen.getByText(/^Total Reproduccions: \d+$/).textContent?.replace(
          "Total Reproduccions: ",
          "",
        ),
      );

      expect(displayedCount).toBe(Math.floor(roll * 10000));
      expect(displayedCount).toBeGreaterThanOrEqual(0);
      expect(displayedCount).toBeLessThan(10000);

      unmount();
    });
  });

  it("does not modify the source track data", () => {
    const originalTracks = structuredClone(tracks);
    vi.spyOn(Math, "random").mockReturnValue(Math.random());

    render(<App />);

    expect(tracks).toEqual(originalTracks);
  });
});
