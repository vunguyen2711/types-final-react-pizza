import React, { useEffect, useState } from "react";
import * as S from "./style";
import { Button, Rate, Space, Divider, Avatar, Modal, Spin } from "antd";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type {
  CommentForm,
  CommentProps,
  GetCommentThunkParams,
} from "../../interfaces/interface";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getUserInfo } from "../../redux/features/Login&Register/login&registerSlice";
import moment from "moment";
import {
  getCommentInfo,
  getCommentThunk,
  postCommentThunk,
  resetStatus,
} from "../../redux/features/Comment/CommentSlice";
import CommentItem from "../CommenItem/CommentItem";
import { RoutesPath } from "../../constants/routes.path";
import { Link } from "react-router-dom";
const rateTooltips = ["terrible", "bad", "normal", "good", "wonderful"];
const schema = yup.object().shape({
  comment: yup.string().required("You need to enter your comment"),
});

const Comment: React.FC<CommentProps> = ({ productID }) => {
  console.log(productID);
  const [value, setValue] = useState(3);
  const { id, fullname, email, isLogin } = useAppSelector(getUserInfo);
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector(getCommentInfo);
  const defaultFilterParams = {
    limit: 8,
    page: 1,
    rate: undefined,
    userId: undefined,
    productId: productID,
  };
  const [filterParams, setFilterParams] = useState<GetCommentThunkParams>({
    ...defaultFilterParams,
  });
  console.log(filterParams);
  const {
    handleSubmit,
    formState: { errors },
    register,
    resetField,
  } = useForm<CommentForm>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const changeRateValue = (e: number) => {
    setValue(e);
  };
  const onSubmit = handleSubmit((data) => {
    const { comment } = data;
    const commentContent = {
      comment,
      userId: id,
      email: email,
      name: fullname,
      productId: productID,
      time: moment().format(),
      rate: value,
    };
    dispatch(postCommentThunk(commentContent));
    resetField("comment");
    Modal.success({
      content: "Your comment post successfully !!!",
      afterClose() {
        dispatch(getCommentThunk(filterParams));
        dispatch(resetStatus());
      },
    });
  });
  const updateFilterParams = (field: string | null, value: any | null) => {
    const defaultFilterParams = {
      limit: 8,
      page: 1,
      rate: undefined,
      userId: undefined,
      productId: productID,
    };
    if (field === null && value === null) {
      setFilterParams({
        ...defaultFilterParams,
      });
    } else {
      setFilterParams((prev) => {
        return {
          ...defaultFilterParams,
          [field]: value,
        };
      });
    }
  };
  useEffect(() => {
    if (errors.comment) {
      Modal.error({ content: `${errors.comment.message}` });
    }
  }, [errors.comment]);

  useEffect(() => {
    dispatch(getCommentThunk(filterParams));
  }, [filterParams]);
  useEffect(() => {
    setFilterParams((prev) => {
      return {
        ...prev,
        productId: productID,
      };
    });
  }, [productID]);
  return (
    <S.CommentContainer>
      <h1 className="comment__title">REVIEWS AND FEEDBACKS</h1>
      <div className="comment__filter">
        <Space wrap className="filter" align="start" direction="horizontal">
          <h1 className="filter__average">
            Total: <span></span>
          </h1>
          <Divider type="vertical"></Divider>
          <Space wrap direction="horizontal" className="filter__button">
            <Button onClick={() => updateFilterParams(null, null)}>All</Button>
            <Button onClick={() => updateFilterParams("userId", id)}>
              Your Feedback
            </Button>
            <Button onClick={() => updateFilterParams("rate", 5)}>
              5 stars
            </Button>
            <Button onClick={() => updateFilterParams("rate", 4)}>
              4 stars
            </Button>
            <Button onClick={() => updateFilterParams("rate", 3)}>
              3 stars
            </Button>
            <Button onClick={() => updateFilterParams("rate", 2)}>
              2 stars
            </Button>
            <Button onClick={() => updateFilterParams("rate", 1)}>
              1 stars
            </Button>
            <Button onClick={() => updateFilterParams("rate", 0)}>
              0 stars
            </Button>
          </Space>
        </Space>
      </div>
      {!isLogin ? (
        <div className="comment__notification">
          <Link to={RoutesPath.LOGIN}>
            <button>You need to Login to give your feedbacks !!!</button>
          </Link>
        </div>
      ) : (
        <div className="comment__top">
          <Space direction="horizontal">
            <Avatar>{fullname?.slice(0, 1)}</Avatar>
            <h1 className="comment__top-email">{email}</h1>
          </Space>

          <form
            onSubmit={onSubmit}
            id="myform"
            action=""
            className="comment__form"
          >
            <div className="form__control">
              <textarea
                {...register("comment")}
                name="comment"
                placeholder="Your Comment Here..."
              />
            </div>
            <div className="form__control">
              <Rate
                value={value}
                onChange={(e) => changeRateValue(e)}
                tooltips={rateTooltips}
              ></Rate>
            </div>
            <div className="form__control">
              <Button form="myform" htmlType="submit">
                Comment
              </Button>
            </div>
          </form>
        </div>
      )}

      <Divider></Divider>

      <div className="comment__bottom">
        {comments.length !== 0 ? (
          comments.map((comment, index) => {
            return (
              <CommentItem
                key={comment.id}
                data={comment}
                filterParams={filterParams}
              ></CommentItem>
            );
          })
        ) : (
          <div className="comment__notification">
            <h1>There is no comments here</h1>
          </div>
        )}
      </div>
    </S.CommentContainer>
  );
};

export default Comment;
