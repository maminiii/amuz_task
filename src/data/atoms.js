import { atom, atomFamily } from "recoil";

export const atomIsLoaded = atom({
    key: "ATOM_IS_LOADED",
    default: false,
});

export const atomNeedUpdate = atom({
    key: "ATOM_NEED_UPDATE",
    default: true,
});

export const atomCommentList = atomFamily({
    key: "ATOM_COMMENT_LIST",
    default: (id) => {
        return {
            id,
            body: "",
            name: "",
        };
    },
});

export const atomUserList = atom({
    key: "ATOM_USER_LIST",
    default: [],
});
export const atomPostList = atom({
    key: "ATOM_POST_LIST",
    default: [],
});
