import { Col, Row, Space, Avatar, Rate, Divider, Button, Modal } from "antd";
import React from "react";
import type { CommentItemsProps } from "../../interfaces/interface";
import * as S from "./style";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getUserInfo } from "../../redux/features/Login&Register/login&registerSlice";
import {
  deleteCommentThunk,
  getCommentThunk,
  resetStatus,
} from "../../redux/features/Comment/CommentSlice";
const CommentItem: React.FC<CommentItemsProps> = ({ data, filterParams }) => {
  const { comment, email, name, rate, time, userId, productId } = data || {};

  const dispatch = useAppDispatch();
  const userReduxId = useAppSelector(getUserInfo).id;
  const commentReduxId = data.id;
  const momentFromNow = moment(time).fromNow();
  const handleDeleteComment = () => {
    Modal.confirm({
      content: "Do you want to delete this comment ???",
      okText: "Accept",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(deleteCommentThunk(commentReduxId));
      },
      afterClose: () => {
        dispatch(getCommentThunk(filterParams));
      },
    });
  };
  return (
    <S.CommentItemsContainer>
      <Space align="start" direction="horizontal">
        <div className="comment__avatar">
          <Avatar>{name.slice(0, 1)}</Avatar>
        </div>
        <Space align="start" direction="vertical" className="comment__content">
          <h2 className="comment__email">{email}</h2>
          <p className="comment__moment">{momentFromNow}</p>
          <Rate disabled defaultValue={rate}></Rate>
          <p className="comment__detail">{comment}</p>
        </Space>
      </Space>
      {userId === userReduxId && (
        <Button onClick={handleDeleteComment} className="btn__delete-comment">
          Delete Comment!!!
        </Button>
      )}
      <Divider></Divider>
    </S.CommentItemsContainer>
  );
};

export default CommentItem;
