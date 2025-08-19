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
