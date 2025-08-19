import type { ListType, ItemType, ListActionType } from "../types";

export const listsReducer = (lists: ListType[], action: ListActionType) => {
    switch (action.type) {
        case "listAdd": {
            const maxOrdering =
                lists.length > 0 ? Math.max(...lists.map((l) => l.ordering)) : 0;
            const newList: ListType = {
                id: Date.now().toString(),
                title: action.listTitle,
                items: [],
                ordering: maxOrdering + 1,
            };
            return [...lists, newList];
        }
        case "listEdit": {
            return lists.map((list: ListType) =>
                list.id === action.listId
                    ? { ...list, title: action.listTitle }
                    : list
            );
        }
        case "listDelete": {
            return lists.filter((list) => list.id !== action.listId);
        }
        case "listReorder": {
            if (action.activeId === action.overId) return lists;
            const activeIndex = lists.findIndex(
                (list) => list.id === action.activeId
            );
            const overIndex = lists.findIndex((list) => list.id === action.overId);
            if (activeIndex === -1 || overIndex === -1) return lists;
            const newLists = [...lists];
            const [movedList] = newLists.splice(activeIndex, 1);
            newLists.splice(overIndex, 0, movedList);
            return newLists.map((list, index) => ({
                ...list,
                ordering: index + 1,
            }));
        }
        case "itemAdd": {
            const newItem: ItemType = {
                id: Date.now().toString(),
                title: action.itemTitle,
                checked: false,
                ordering: 0,
            };
            return lists.map((list) => {
                if (list.id === action.listId) {
                    const maxOrdering =
                        list.items.length > 0
                            ? Math.max(...list.items.map((item) => item.ordering))
                            : 0;
                    newItem.ordering = maxOrdering + 1;
                    return { ...list, items: [...list.items, newItem] };
                }
                return list;
            });
        }
        case "itemCheck": {
            return lists.map((list) =>
                list.id === action.listId
                    ? {
                          ...list,
                          items: list.items.map((item) =>
                              item.id === action.itemId
                                  ? { ...item, checked: !item.checked }
                                  : item
                          ),
                      }
                    : list
            );
        }
        case "itemReorder": {
            return lists.map((list) => {
                if (list.id === action.listId) {
                    if (action.activeId === action.overId) return list;

                    const activeIndex = list.items.findIndex(
                        (item) => item.id === action.activeId
                    );
                    const overIndex = list.items.findIndex(
                        (item) => item.id === action.overId
                    );

                    if (activeIndex === -1 || overIndex === -1) return list;

                    const newItems = [...list.items];
                    const [movedItem] = newItems.splice(activeIndex, 1);
                    newItems.splice(overIndex, 0, movedItem);

                    const updatedItems = newItems.map((item, index) => ({
                        ...item,
                        ordering: index + 1,
                    }));

                    return {
                        ...list,
                        items: updatedItems,
                    };
                }
                return list;
            });
        }
        default:
            throw Error("Unknown action: ");
    }
};
