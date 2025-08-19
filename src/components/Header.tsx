import type { ReactNode } from "react";
import "./Header.css";

interface HeaderProps {
    children: ReactNode;
}
export default function Header({ children }: HeaderProps) {
    return (
        <div className="header">
            <h1>To Do List</h1>
            {children}
        </div>
    );
}
