import type { TrackCreate } from "./Interfaces/TrackCreate";

export async function PutTrack(newTrack: TrackCreate, id:string): Promise<void> {
    const response: Response = await fetch(
        `http://localhost:3000/tracks/${id}`, 
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTrack)
        })

    if (!response.ok) {
        throw new Error(`Error afegint la cançó (${response.status})`);
    }
}