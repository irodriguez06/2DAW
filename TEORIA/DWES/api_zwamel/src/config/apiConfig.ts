import { ApiConfig } from "../interfaces/config/apiConfig"

export const APICONFIG: ApiConfig = {
    name: "API Spotify",
    description: "Manage Spotify functionality",
    host: "localhost",
    port: 3000,
    status: "Working",
    version: {
        major: 1,
        minor: 0,
        patch: 0
    },
    resources: [
        {
            name: "Root",
            endPoint: "/"
        },
        {
            name :"Track",
            endPoint: "GET /tracks"
        }
    ]
}