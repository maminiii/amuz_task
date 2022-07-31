import styled from "styled-components";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { atomUserList, atomPostList } from "./MainPage";
import { useRecoilValue } from "recoil";
import ListItemCard from "./ListItemCard";
import Header from "./Header";
import FlexBox from "./FlexBox";

const LinkArrow = styled(Link)`
    text-decoration: none;
    &:hover {
        opacity: 0.3;
        &.none {
            opacity: 1;
        }
    }
    &.none {
        cursor: not-allowed;
        pointer-events: none;
    }
`;

const LinkContainer = styled(Link)`
    text-decoration: none;
    width: 50%;
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
    font-size: 100px;
`;

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
`;
const DescContainer = styled.p`
    padding: 10px;
    margin: 5px 15px;
    max-width: 60vw;
    text-align: center;
    border-radius: 30px;
    border: 2px solid rgba(0, 0, 0, 0.1);
`;
const PostContainer = styled.div``;
const CompletedContainer = styled.div`
    text-align: right;
    color: ${(props) => props.color};
    margin-right: 10px;
`;

const PreviewContainer = styled(FlexBox).attrs({
    justify: "center",
})`
    width: 100%;
    margin-top: 50px;
    padding: 0 50px;
`;
const NavLabel = styled.div`
    width: 100%;
    color: gray;
    text-align: center;
`;

const DetailView = () => {
    const { userId, itemId } = useParams();
    const itemIdx = Number(itemId);
    const postTotalList = useRecoilValue(atomPostList);
    const currentPostList = postTotalList[userId - 1];
    const [post, setPost] = useState({});
    const [prevPost, setPrevPost] = useState({});
    const [nextPost, setNextPost] = useState({});

    useLayoutEffect(() => {
        setPost(setNewPost(itemIdx));
    }, [itemIdx]);
    useLayoutEffect(() => {
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
    }, [post]);

    const setNewPost = (_itemId) => {
        let temp;
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
                        <Title color={post.completed ? "blue" : "red"}>{post.title}</Title>
                        <FlexBox direction="row">
                            <LinkArrow
                                className={prevPost?.empty ? "none" : ""}
                                to={`/postlist/${userId}/detailview/${itemIdx - 1}`}
                            >
                                <NavContainer>{"<"}</NavContainer>
                            </LinkArrow>
                            <DescContainer>
                                <div>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown printer took a galley
                                    of type and scrambled it to make a type specimen book. It has
                                    survived not only five centuries, but also the leap into
                                    electronic typesetting, remaining essentially unchanged. It was
                                    popularised in the 1960s with the release of Letraset sheets
                                    containing Lorem Ipsum passages, and more recently with desktop
                                    publishing software like Aldus PageMaker including versions of
                                    Lorem Ipsum.
                                </div>
                                <CompletedContainer color={post.completed ? "blue" : "red"}>
                                    {post.completed ? "완료" : "미완료"}
                                </CompletedContainer>
                            </DescContainer>
                            <LinkArrow
                                className={nextPost?.empty ? "none" : ""}
                                to={`/postlist/${userId}/detailview/${itemIdx + 1}`}
                            >
                                <NavContainer>{">"}</NavContainer>
                            </LinkArrow>
                        </FlexBox>
                    </PostContainer>
                    <PreviewContainer>
                        <FlexBox direction="column" style={{ width: "50%" }}>
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

                        <FlexBox direction="column" style={{ width: "50%" }}>
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
            </PostPageContainer>
        </>
    );
};
export default DetailView;
