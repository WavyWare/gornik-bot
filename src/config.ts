export type PageType = 'web' | 'minecraft';

export interface Page {
    name: string;
    description: string;
    link: string;
    type: PageType;
}

export const pages: Page[] = [
    {
        name: "SinusBot",
        description: "Bot TeamSpeak do muzyki",
        link: "http://teamspeak.gornik.edu.pl:8087",
        type: "web"
    },
    {
        name: "Serwer TeamSpeak 3",
        description: "Kliknij, aby połączyć się z naszym komunikatorem głosowym.",
        link: "https://teamspeak.gornik.edu.pl",
        type: "web"
    },
    {
        name: "Konwerter plików",
        description: "Kliknij, aby konwertować pliki",
        link: "https://convert.gornik.edu.pl/",
        type: "web"
    },
    {
        name: "MeTube",
        description: "Downloader filmów z YouTube",
        link: "https://youtube.gornik.edu.pl/",
        type: "web"
    },
    // {
    //     name: "Serwer Minecraft",
    //     description: "Dołącz do naszej przygody w świecie sześcianów! IP: mc.example.com",
    //     link: "mc.example.com", // Minecraft uses IP, usually not a protocol link in browser dispatchers unless custom
    //     type: "minecraft"
    // },
];
