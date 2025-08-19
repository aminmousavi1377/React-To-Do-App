import "./App.css";
import Header from "./components/Header";
import Board from "./components/Board";
import Wallpaper from "./components/Wallpaper";
import { useEffect, useState } from "react";

function App() {
    const [selectedWallpaper, setSelectedWallpaper] = useState(() => {
        try {
            const savedWallpaper = localStorage.getItem("wallpaper");
            return savedWallpaper ? savedWallpaper : "1.jpg";
        } catch (error) {
            console.log("Error while getting wallpaper from localstorage: ", error);
            return "1.jpg";
        }
    });
    const handleSelectWallpaper = (wallpaper: string) => {
        setSelectedWallpaper(wallpaper);
    };

    useEffect(() => {
        try {
            localStorage.setItem("wallpaper", selectedWallpaper);
        } catch (error) {
            console.log("Error while setting wallpaper to localstorage: ", error);
        }
    }, [selectedWallpaper]);

    return (
        <div
            className="app"
            style={{
                backgroundImage: `url(
                    ./src/assets/images/wallpapers/${selectedWallpaper}
                )`,
            }}
        >
            <div className="background-image-overlay"></div>
            <Header>
                <Wallpaper onSelectWallpaper={handleSelectWallpaper} />
            </Header>
            <Board />
        </div>
    );
}

export default App;
