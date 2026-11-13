import { Like } from "../interfaces/likes/like";

export function isValidLike(item: unknown): item is Like {
    if (typeof item !== "object" || item === null) {
        return false;
    }

    const likeItem = item as Record<string, unknown>;
    return Boolean(
        typeof likeItem.track === "string"
        && likeItem.track.trim().length > 0
        && (likeItem.like === 1 || likeItem.like === -1),
    );
}
