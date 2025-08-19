import { FaTimes } from "react-icons/fa";
import "./Wallpaper.css";
import { useRef, useState, type RefObject } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { LuWallpaper } from "react-icons/lu";

const wallpapers = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
];
interface WallpaperProps {
    onSelectWallpaper: (wallpaper: string) => void;
}
export default function Wallpaper({ onSelectWallpaper }: WallpaperProps) {
    const [isBoxOpen, setIsBoxOpen] = useState(false);
    const boxRef = useRef<HTMLDivElement>(null);

    const showBox = () => setIsBoxOpen(true);
    const hideBox = () => setIsBoxOpen(false);

    useClickOutside(boxRef as RefObject<HTMLElement>, isBoxOpen, hideBox);
    return (
        <div className="wallpaper-container">
            <button
                className="wallpaper-select-btn"
                onClick={showBox}
                aria-label="select wallpaper"
            >
                <LuWallpaper />
            </button>
            {isBoxOpen && (
                <div className="wallpaper-box" ref={boxRef}>
                    <h4 className="wallpaper-box-title">
                        Select wallpaper
                        <button className="wallpaper-box-close" onClick={hideBox}>
                            <FaTimes />
                        </button>
                    </h4>
                    {wallpapers.map((wallpaper) => (
                        <button
                            className="wallpaper-box-item"
                            key={wallpaper}
                            onClick={() => onSelectWallpaper(wallpaper)}
                            aria-label="wallpaper item"
                        >
                            <img
                                className="wallpaper-box-img"
                                src={`/src/assets/images/wallpapers/thumbnails/${wallpaper}`}
                                alt={`Wallpaper ${wallpaper}`}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
