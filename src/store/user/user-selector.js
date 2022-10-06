import { useSelector } from "react-redux";

export const selectCurrentUser = ((state) => state.user.currentUser)