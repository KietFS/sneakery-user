import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { IStoreDispatch, IRootState } from "../redux";

export const useAppDispatch = () => useDispatch<IStoreDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
