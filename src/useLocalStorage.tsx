import React, {useState, useEffect} from "react";

type ReturnType<T> = [
        T | undefined,
    React.Dispatch<React.SetStateAction<T | undefined>>,
    () => void
]

export const useLocalStorage = <T, >(
    key: string,
    initialValue?: T
): ReturnType<T> => {
    const [state, setState] = useState<T | undefined>(
        () => {
            if (!initialValue) return;
            try {
                const value = localStorage.getItem(key);
                return value ? JSON.parse(value) : initialValue;
            } catch (err) {
                return initialValue;
            }
        }
    );

    const clearLocalStorage = (): void => {
        try {
            localStorage.removeItem(key);
            setState(undefined);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (state) {
            try {
                localStorage.setItem(key, JSON.stringify(state));
            } catch (err) {
                console.log(err);
            }
        }
    }, [state, key]);

    return [state, setState, clearLocalStorage];
}