import { createContext } from 'react';

interface PageContextType {
    activePage: string;
    setActivePage: (page: string) => void;
}

export const PageContext = createContext<PageContextType>({
    activePage: '',
    setActivePage: () => {},
});