export const getDisplayedItems = (
    items,
    showAll,
    initialItems
) => {
    if (showAll) {
        return items;
    }

    return items.slice(0, initialItems);
};
