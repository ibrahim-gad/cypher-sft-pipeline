// src/utils/localStorageUtils.ts
export const loadState = (key: string, defaultValue: any): string=> {
    const savedState = localStorage.getItem(key);
    return savedState || defaultValue;
};

export const saveState = (key: string, value: any): void => {
    localStorage.setItem(key, value);
};