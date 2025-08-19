import "./Board.css";
import { useEffect, useReducer, useState } from "react";
import type { ListDeleteType } from "../types";
import { listsReducer } from "../reducers/listsReducer";
import { FaQuestion } from "react-icons/fa";
import List, { ListAdd } from "./List";
import Alert from "./Alert";

export default function Board() {
    const [lists, dispatch] = useReducer(
        listsReducer,
        (() => {
            try {
                const savedLists = localStorage.getItem("lists");
                return savedLists ? JSON.parse(savedLists) : [];
            } catch (error) {
                console.log("Error while getting lists from localstorage: ", error);
                return [];
            }
        })()
    );
    const [deleteConfirmation, setDeleteConfirmation] = useState<ListDeleteType>({
        isOpen: false,
        listId: "",
    });

    const handleListAdd = (listTitle: string) => {
        dispatch({
            type: "listAdd",
            listTitle: listTitle,
        });
    };
    const handleListEdit = (listId: string, listTitle: string) => {
        dispatch({
            type: "listEdit",
            listId,
            listTitle,
        });
    };
    const handleListDelete = (listId: string) => {
        setDeleteConfirmation({
            isOpen: true,
            listId,
        });
    };
    const handleItemAdd = (listId: string, itemTitle: string) => {
        dispatch({
            type: "itemAdd",
            listId,
            itemTitle,
        });
    };
    const handleItemCheck = (listId: string, itemId: string) => {
        dispatch({
            type: "itemCheck",
            listId,
            itemId,
        });
    };
    const handleConfirmDelete = () => {
        if (deleteConfirmation.listId) {
            dispatch({
                type: "listDelete",
                listId: deleteConfirmation.listId,
            });
        }
        setDeleteConfirmation({
            isOpen: false,
            listId: "",
        });
    };
    const handleCancelDelete = () => {
        setDeleteConfirmation({
            isOpen: false,
            listId: "",
        });
    };

    useEffect(() => {
        try {
            localStorage.setItem("lists", JSON.stringify(lists));
        } catch (error) {
            console.log("Error while setting lists to localstorage: ", error);
        }
    }, [lists]);

    return (
        <div className="board">
            {lists
                .sort((a, b) => a.ordering - b.ordering)
                .map((list) => (
                    <List
                        list={list}
                        key={list.id}
                        onItemAdd={handleItemAdd}
                        onListEdit={handleListEdit}
                        onListDelete={handleListDelete}
                        onItemCheck={handleItemCheck}
                    />
                ))}
            <ListAdd onListAdd={handleListAdd} />
            <Alert
                isOpen={deleteConfirmation.isOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                color="main"
                icon={FaQuestion}
                title="Delete List"
                message={`Are you sure you want to delete this list?`}
            />
        </div>
    );
}
