import { useCallback, useEffect, type RefObject } from "react";

export function useClickOutside(
    ref: RefObject<HTMLElement>,
    isOpen: boolean,
    callback: () => void
) {
    const handleClickOutside = useCallback(
        (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        },
        [ref, callback]
    );
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, handleClickOutside]);
}
