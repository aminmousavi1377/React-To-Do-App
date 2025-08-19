import "./List.css";
import { useState, useRef, useEffect, type RefObject } from "react";
import { FaEye, FaEyeSlash, FaPlus, FaTimes } from "react-icons/fa";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";
import Item, { ItemAdd } from "./Item";
import { type ListType } from "../types";
import { useClickOutside } from "../hooks/useClickOutside";

interface ListProps {
    list: ListType;
    onItemAdd: (listId: string, itemTitle: string) => void;
    onListEdit: (listId: string, listTitle: string) => void;
    onListDelete: (listId: string, listTitle: string) => void;
    onItemCheck: (listId: string, itemId: string) => void;
}
interface ListAddProps {
    onListAdd: (title: string) => void;
}

export default function List({
    list,
    onItemAdd,
    onListEdit,
    onListDelete,
    onItemCheck,
}: ListProps) {
    const [isListEdit, setIsListEdit] = useState(false);
    const [hideCheckedItems, setHideCheckedItems] = useState(false);
    const listEditInputRef = useRef<HTMLInputElement>(null);
    const itemCheckedCounts = list.items.filter((item) => item.checked).length;
    const listItems = hideCheckedItems
        ? list.items.filter((item) => !item.checked)
        : list.items;

    const showListEditInput = () => setIsListEdit(true);
    const hideListEditInput = () => setIsListEdit(false);
    const handleClickDelete = () => {
        onListDelete(list.id, list.title);
    };
    const handleListEdit = (listId: string) => {
        const inputElement = listEditInputRef.current;
        if (!inputElement) return;
        const title = inputElement.value.trim();
        if (title && title !== list.title) {
            onListEdit(listId, title);
            inputElement.value = "";
        }
        hideListEditInput();
    };

    useEffect(() => {
        if (isListEdit && listEditInputRef.current) {
            listEditInputRef.current.value = list.title;
            listEditInputRef.current.focus();
            listEditInputRef.current.select();
        }
    }, [isListEdit, list.title]);

    return (
        <div className="list" key={list.id}>
            <div className="list-header">
                {!isListEdit ? (
                    <h2 className="list-title">{list.title}</h2>
                ) : (
                    <input
                        ref={listEditInputRef}
                        className="list-edit-input"
                        name="listEditInput"
                        onKeyUp={(e) => e.key === "Enter" && handleListEdit(list.id)}
                        onBlur={hideListEditInput}
                    />
                )}
            </div>
            <div className="list-actions">
                <button
                    className="list-filter-btn"
                    onClick={() => setHideCheckedItems(!hideCheckedItems)}
                    disabled={itemCheckedCounts === 0}
                >
                    {hideCheckedItems ? (
                        <>
                            <FaEye />
                            Show checked items
                        </>
                    ) : (
                        <>
                            <FaEyeSlash />
                            Hide checked items
                        </>
                    )}
                </button>
                <small>
                    {itemCheckedCounts} / {list.items.length}
                </small>
                <button className="list-edit-btn" onClick={showListEditInput}>
                    <LuPencilLine />
                </button>
                <button className="list-delete-btn" onClick={handleClickDelete}>
                    <LuTrash2 />
                </button>
            </div>
            <div className="list-items">
                {listItems
                    .sort((a, b) => a.ordering - b.ordering)
                    .map((item) => (
                        <Item
                            item={item}
                            key={item.id}
                            onItemCheck={(itemId) => onItemCheck(list.id, itemId)}
                        />
                    ))}
            </div>
            <ItemAdd onItemAdd={(title: string) => onItemAdd(list.id, title)} />
        </div>
    );
}

export function ListAdd({ onListAdd }: ListAddProps) {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const listAddFormRef = useRef<HTMLDivElement>(null);
    const listAddInputRef = useRef<HTMLInputElement>(null);

    const showListAddInput = () => setIsInputVisible(true);
    const hideListAddInput = () => setIsInputVisible(false);
    const handleListAdd = () => {
        const inputElement = listAddInputRef.current;
        if (!inputElement) return;
        const title = inputElement.value.trim();
        if (title) {
            onListAdd(title);
            inputElement.value = "";
            inputElement.focus();
        }
    };

    useClickOutside(
        listAddFormRef as RefObject<HTMLDivElement>,
        isInputVisible,
        hideListAddInput
    );
    useEffect(() => {
        if (isInputVisible && listAddInputRef.current) {
            listAddInputRef.current.focus();
        }
    }, [isInputVisible]);

    return !isInputVisible ? (
        <button
            className="list-add-btn"
            onClick={showListAddInput}
            aria-label="add list"
        >
            Add List
            <FaPlus className="list-add-btn-icon" />
        </button>
    ) : (
        <div ref={listAddFormRef} className="list-add-form">
            <input
                ref={listAddInputRef}
                className="list-add-input"
                type="text"
                name="ListAddInput"
                placeholder="Enter list title..."
                required
                onKeyUp={(e) => e.key === "Enter" && handleListAdd()}
                autoComplete="off"
            />
            <button
                className="list-add-confirm"
                onClick={handleListAdd}
                aria-label="submit add list"
            >
                Add List
            </button>
            <button
                className="list-add-cancel"
                onClick={hideListAddInput}
                aria-label="cancel add list"
            >
                <FaTimes />
            </button>
        </div>
    );
}
