import { createContext } from 'react';
import { PageContextType } from '../ts/inferfaces';

export const PageContext = createContext<PageContextType>({
    activePage: '',
    setActivePage: () => {},
});