import { Like } from "./like";

export interface LikeBD extends Like {
    id: string;
    date: Date;
}
