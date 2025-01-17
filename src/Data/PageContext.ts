import { createContext } from 'react';
import { PageContextType } from '../ts/interfaces';

export const PageContext = createContext<PageContextType>({
    activePage: '',
    setActivePage: () => {},
});