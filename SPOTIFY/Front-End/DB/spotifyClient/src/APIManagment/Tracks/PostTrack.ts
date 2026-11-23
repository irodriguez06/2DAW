import type { TrackCreate } from "../Tracks/Interfaces/TrackCreate";
import { ENV } from "../../Config/env";

export async function PostTrack(newTrack: TrackCreate): Promise<void> {
    const response: Response = await fetch(
        `${ENV.API_BASE_URL}/tracks/new`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTrack)
        })

    if (!response.ok) {
        throw new Error(`Error afegint la cançó (${response.status})`);
    }
}