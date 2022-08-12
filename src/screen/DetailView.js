import React, { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { atomIsLoaded } from "../data/atoms";

//import AvatarGroupWithAction from "../components/AvatarGroupsWithAction";
import Description from "../components/Description";
import FlexBox from "../components/FlexBox";
import Header from "../components/Header";
import ListItemCard from "../components/ListItemCard";
//import TextAreaWithAvatar from "../components/TextAreaWithAvatar";
import CommentContainer from "../components/CommentContainer";
import { atomSelectedPostId } from "../data/atoms";

import { useSelector } from "react-redux";
import { postCommentsSelector } from "../store/modelDucks/CommentSelectors";
import {
  currentPostSelector,
  userPostsSelector,
} from "../store/modelDucks/PostSelectors";

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
  const [selectedPost, setSelectedPost] = useRecoilState(atomSelectedPostId);
  const currentPostList = useSelector((state) =>
    userPostsSelector(state, userId)
  );
  const [isLoaded, setIsLoaded] = useRecoilState(atomIsLoaded);
  const post = useSelector((state) => currentPostSelector(state, itemId));
  const [prevPost, setPrevPost] = useState({});
  const [nextPost, setNextPost] = useState({});
  let commentList = useSelector((state) =>
    postCommentsSelector(state, itemIdx)
  );

  useLayoutEffect(() => {
    setSelectedPost(itemIdx);
  }, []);

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

  return (
    <>
      <Header title={`Post-Detail #${itemId}`} subtitle={``} />
      <PostPageContainer>
        <FlexBox direction="column">
          <PostContainer>
            <FlexBox
              direction="row"
              align="flex-start"
              style={{ overflow: "hidden" }}
            >
              <FlexBox
                direction="column"
                style={{
                  flexBasis: "60%",
                  padding: "20px 24px",
                  height: "100%",
                }}
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
                <CommentContainer postId={itemIdx} commentList={commentList} />
                {/* <TextAreaWithAvatar postId={itemIdx} />
                <AvatarGroupWithAction commentList={commentList} /> */}
              </FlexBox>
            </FlexBox>
          </PostContainer>
        </FlexBox>
      </PostPageContainer>
    </>
  );
};
export default DetailView;
