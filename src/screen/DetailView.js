import styled from "styled-components";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useRecoilValue, useRecoilState, atomFamily, useSetRecoilState } from "recoil";
import { atomIsLoaded, atomCommentList, atomPostList, atomNeedUpdate } from "../data/atoms";

import ListItemCard from "../components/ListItemCard";
import Header from "../components/Header";
import FlexBox from "../components/FlexBox";
import Description from "../components/Description";
import AvatarGroupWithAction from "../components/AvatarGroupsWithAction";
import TextAreaWithAvatar from "../components/TextAreaWithAvatar";

const LinkArrow = styled(Link)`
    position: absolute;
    ${(props) => (props.type === "left" ? `left:0` : `right:0`)};
    text-decoration: none;
    opacity: 0;
    height: 100%;
    &:hover {
        opacity: 1;
        background-color: rgba(196, 196, 196, 0.1);
        &.none {
            opacity: 0;
        }
    }
    &.none {
        cursor: not-allowed;
        pointer-events: none;
    }
`;

const LinkContainer = styled(Link)`
    text-decoration: none;
    width: 90%;
    margin: 10px;
    &:hover {
        &.none {
            color: red;
        }
    }
    &.none {
        cursor: not-allowed;
        pointer-events: none;
    }
`;

const PostPageContainer = styled.div`
    height: 100%;
`;

const NavContainer = styled.div`
    color: gray;
    font-size: 50px;
    margin: 0 10px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 100%;
`;

const PostContainer = styled.div``;

const PreviewContainer = styled(FlexBox).attrs({
    justify: "center",
})`
    width: 100%;
    margin-top: 50px;
`;
const NavLabel = styled.div`
    width: 100%;
    color: gray;
    text-align: center;
`;

const DetailView = () => {
    const { userId, itemId } = useParams();
    const itemIdx = Number(itemId);
    const [postTotalList, setPostTotalList] = useRecoilState(atomPostList);
    const temp = JSON.parse(sessionStorage.getItem("postList"));
    const needUpdate = useSetRecoilState(atomNeedUpdate);
    const [currentPostList, setCurrentPostList] = useState(postTotalList[userId - 1]);

    useLayoutEffect(() => {
        console.log("##temp", temp);
        if (!(Array.isArray(postTotalList) && postTotalList.length > 0)) setPostTotalList(temp);
    }, []);

    useEffect(() => {
        setCurrentPostList(postTotalList[userId - 1]);
    }, [postTotalList]);

    const [isLoaded, setIsLoaded] = useRecoilState(atomIsLoaded);
    const [post, setPost] = useState({});
    const [prevPost, setPrevPost] = useState({});
    const [nextPost, setNextPost] = useState({});
    const [commentList, setCommentList] = useRecoilState(atomCommentList(itemId));

    const fetchComments = () => {
        setIsLoaded(true);
        axios
            .get(`https://jsonplaceholder.typicode.com/comments?postId=${itemId}`)
            .then((res) => {
                setCommentList(res.data);
            })
            .catch((err) => {
                console.log("##fetchComments err", err);
            })
            .finally(() => {
                setIsLoaded(false);
            });
    };

    useLayoutEffect(() => {
        if (commentList.body === "") {
            fetchComments();
        }
    }, [commentList]);

    useLayoutEffect(() => {
        setPost(setNewPost(itemIdx));
    }, [itemIdx]);

    useLayoutEffect(() => {
        if (currentPostList) {
            if (post.postId === 0) {
                setPrevPost({ empty: true });
                setNextPost(setNewPost(itemIdx + 1));
            } else if (post.postId === currentPostList.length - 1) {
                setPrevPost(setNewPost(itemIdx - 1));
                setNextPost({ empty: true });
            } else {
                setPrevPost(setNewPost(itemIdx - 1));
                setNextPost(setNewPost(itemIdx + 1));
            }
        }
    }, [post]);

    const setNewPost = (_itemId) => {
        let temp;
        if (Array.isArray(currentPostList) && currentPostList.length > 0)
            currentPostList.forEach((item) => {
                if (Number(item.id) === _itemId) temp = item;
            });
        return { ...temp };
    };
    //todo: prev, next box
    return (
        <>
            <Header title={`Post-Detail #${itemId}`} subtitle={``} />
            <PostPageContainer>
                <FlexBox direction="column">
                    <PostContainer>
                        <FlexBox direction="row" align="flex-start" style={{ overflow: "hidden" }}>
                            <FlexBox
                                direction="column"
                                style={{ flexBasis: "60%", padding: "20px 24px", height: "100%" }}
                            >
                                <FlexBox align="flex-start" style={{ position: "relative" }}>
                                    <LinkArrow
                                        type="left"
                                        className={prevPost?.empty ? "none" : ""}
                                        to={`/postlist/${userId}/detailview/${itemIdx - 1}`}
                                    >
                                        <FlexBox style={{ height: "100%" }}>
                                            <NavContainer>{"<"}</NavContainer>
                                        </FlexBox>
                                    </LinkArrow>
                                    <Description title={post.title} />

                                    <LinkArrow
                                        type="right"
                                        className={nextPost?.empty ? "none" : ""}
                                        to={`/postlist/${userId}/detailview/${itemIdx + 1}`}
                                    >
                                        <FlexBox style={{ height: "100%" }}>
                                            <NavContainer>{">"}</NavContainer>
                                        </FlexBox>
                                    </LinkArrow>
                                </FlexBox>
                                <PreviewContainer>
                                    <FlexBox direction="column" style={{ width: "100%" }}>
                                        <NavLabel>{"Prev"}</NavLabel>
                                        <LinkContainer
                                            className={prevPost?.empty ? "none" : ""}
                                            to={`/postlist/${userId}/detailview/${itemIdx - 1}`}
                                        >
                                            <ListItemCard
                                                style={{ width: "100%" }}
                                                item={prevPost?.empty ? "no-item" : prevPost.title}
                                                type="main"
                                            ></ListItemCard>
                                        </LinkContainer>
                                    </FlexBox>

                                    <FlexBox direction="column" style={{ width: "100%" }}>
                                        <NavLabel>{"Next"}</NavLabel>
                                        <LinkContainer
                                            className={nextPost?.empty ? "none" : ""}
                                            to={`/postlist/${userId}/detailview/${itemIdx + 1}`}
                                        >
                                            <ListItemCard
                                                item={nextPost?.empty ? "no-item" : nextPost.title}
                                                type="main"
                                            ></ListItemCard>
                                        </LinkContainer>
                                    </FlexBox>
                                </PreviewContainer>
                            </FlexBox>

                            <FlexBox
                                direction="column"
                                style={{ padding: "10px", flexBasis: "40%", maxWidth: "400px" }}
                            >
                                <TextAreaWithAvatar />
                                <AvatarGroupWithAction commentList={commentList} />
                            </FlexBox>
                        </FlexBox>
                    </PostContainer>
                </FlexBox>
            </PostPageContainer>
        </>
    );
};
export default DetailView;
