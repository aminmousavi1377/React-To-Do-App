import "./Alert.css";
import type { IconType } from "react-icons";

interface AlertProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    color: "red" | "blue" | "green" | "yellow" | "main";
    icon: IconType;
    title: string;
    message?: string;
}
export default function Alert({
    isOpen,
    onConfirm,
    onCancel,
    color,
    icon: IconComponent,
    title,
    message = "",
}: AlertProps) {
    if (!isOpen) return null;
    return (
        <div className="alert-container">
            <div className={"alert-box " + color}>
                <div className="alert-header">
                    <IconComponent className="alert-icon" />
                    <h3 className="alert-title">{title}</h3>
                </div>
                <p className="alert-message">{message}</p>
                <div className="alert-actions">
                    <button className="cancel" onClick={onCancel} aria-label="cancel alert">
                        Cancel
                    </button>
                    <button className="confirm" onClick={onConfirm} aria-label="confirm alert">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
