interface Song {
    id: string;
    title: string;
    artist: string;
    duration: number;
}

interface PlayList {
    name: string;
    songs: Song[];
}

interface User {
    name: string,
    playList: PlayList[];
};

const cancons: Song[] = [
    {
        id: "2B-CA",
        title: "Rattle and Hum",
        artist: "U2",
        duration: 90
    },
    {
        id: "3B-TX",
        title: "Chicago",
        artist: "MJ",
        duration: 190
    },
    {
        id: "3Z-TX",
        title: "NY",
        artist: "MJ",
        duration: 170
    },
]

const llistaRepro: PlayList[] = [
    {
        name: "LMarc",
        songs: [
            {
                id: "2B-CA",
                title: "Rattle and Hum",
                artist: "U2",
                duration: 90
            },
            {
                id: "3B-TX",
                title: "Chicago",
                artist: "MJ",
                duration: 190
            }]
    },
    {
        name: "LIsac",
        songs: [{
                id: "3B-TX",
                title: "Chicago",
                artist: "MJ",
                duration: 190
            }]
    },
    {
        name: "LBerni",
        songs: []
    }
]

const users: User[] = [
    {
        name: "Marc",
        playList: [llistaRepro[0]]
    },
    {
        name: "Anna",
        playList: [llistaRepro[1], llistaRepro[2]]
    }
]

function songsSearchArtist(artist:string,songs:Song[]):Song[] {
    return songs.filter(
        (s:Song) => {return artist === s.artist}
    );
}

function songsPlayListArtist(artist:string, playListS:PlayList[]):Song[] {
    let songs:Song[] = [];
    for(let i:number=0;i<playListS.length;i++) {
        let songsArtists:Song[] = songsSearchArtist(artist, playListS[i].songs);
        songs = songs.concat(songsArtists);
    }
    return songs;
}

function songsArtist(artist: string, username: string, users: User[]) {
    const user:User[] = users.filter(
        (u:User) => { return u.name === username }
    );
    const playListsUser: PlayList[] = user[0].playList;
    return songsPlayListArtist(artist, playListsUser);
}

let nameArtist: string = "MJ";
let username: string = "Marc";

const songs: Song[]=songsArtist(nameArtist, username, users);

console.log(songs);

export { }