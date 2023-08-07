import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootReducer } from 'store/redux/rootReducer';

export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector;
