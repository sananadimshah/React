import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../features/Todo/todoSilce";

const Todos = () => {
  const selector = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  return <div>Todos</div>;
};

export default Todos;
