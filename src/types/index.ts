export interface ListType {
    id: string;
    title: string;
    items: ItemType[];
    ordering: number;
}

export interface ListDeleteType {
    isOpen: boolean;
    listId: string;
}

export interface ItemType {
    id: string;
    title: string;
    checked: boolean;
    ordering: number;
}

export type ListActionType =
    | { type: "listAdd"; listTitle: string }
    | { type: "listEdit"; listId: string; listTitle: string }
    | { type: "listDelete"; listId: string }
    | { type: "listReorder"; activeId: string; overId: string }
    | { type: "itemAdd"; listId: string; itemTitle: string }
    | { type: "itemCheck"; listId: string; itemId: string }
    | { type: "itemReorder"; listId: string; activeId: string; overId: string };
