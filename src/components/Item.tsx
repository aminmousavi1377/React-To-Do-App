import "./Item.css";
import { useEffect, useRef, useState, type RefObject } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import type { ItemType } from "../types";
import { useClickOutside } from "../hooks/useClickOutside";

interface ItemProps {
    item: ItemType;
    onItemCheck: (itemId: string) => void;
}
interface ItemAddProps {
    onItemAdd: (title: string) => void;
}
export default function Item({ item, onItemCheck }: ItemProps) {
    return (
        <div className="item">
            <h3 className="item-title">{item.title}</h3>
            <input
                className="item-checkbox"
                type="checkbox"
                onChange={() => onItemCheck(item.id)}
                checked={item.checked}
            />
        </div>
    );
}

export function ItemAdd({ onItemAdd }: ItemAddProps) {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const showInput = () => setIsInputVisible(true);
    const hideInput = () => setIsInputVisible(false);
    const handleItemAdd = () => {
        const inputElement = inputRef.current;
        if (!inputElement) return;
        const title = inputElement.value.trim();

        if (title) {
            onItemAdd(title);
            inputElement.value = "";
            inputElement.focus();
        }
    };

    useClickOutside(formRef as RefObject<HTMLDivElement>, isInputVisible, hideInput);
    useEffect(() => {
        if (isInputVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isInputVisible]);

    return !isInputVisible ? (
        <button className="item-add-btn" onClick={showInput} aria-label="add item">
            Add item
            <FaPlus className="item-add-btn-icon" />
        </button>
    ) : (
        <div ref={formRef} className="item-add-form">
            <input
                ref={inputRef}
                className="item-add-input"
                type="text"
                name="itemAddInput"
                placeholder="Enter item title..."
                required
                onKeyUp={(e) => e.key === "Enter" && handleItemAdd()}
                autoComplete="off"
            />
            <button
                className="item-add-confirm"
                onClick={handleItemAdd}
                aria-label="submit add item"
            >
                Add item
            </button>
            <button
                className="item-add-cancel"
                onClick={hideInput}
                aria-label="cancel add item"
            >
                <FaTimes />
            </button>
        </div>
    );
}
