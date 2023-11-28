import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Comment from "../components/Comment.js";

// Mock the functions passed as props
const mockHandleInsertNode = jest.fn();
const mockHandleEditNode = jest.fn();
const mockHandleDeleteNode = jest.fn();

const mockComment = {
  id: 1,
  name: "Test Comment",
  items: [],
};

test("renders Comment component", () => {
  const { getByText, getByPlaceholderText } = render(
    <Comment
      handleInsertNode={mockHandleInsertNode}
      handleEditNode={mockHandleEditNode}
      handleDeleteNode={mockHandleDeleteNode}
      comment={mockComment}
    />
  );

  // Check if the comment name is rendered
  const commentNameElement =  screen.getByText("Test Comment");
  expect(commentNameElement).toBeInTheDocument();

  // Check if the input placeholder is rendered
  const inputElement = screen.getByPlaceholderText("type...");
  expect(inputElement).toBeInTheDocument();
});

test("handles user actions", () => {
  const { getByText, getByPlaceholderText } = render(
    <Comment
      handleInsertNode={mockHandleInsertNode}
      handleEditNode={mockHandleEditNode}
      handleDeleteNode={mockHandleDeleteNode}
      comment={mockComment}
    />
  );

  // Click on the "REPLY" button
  const replyButton = screen.getByText("REPLY");
  fireEvent.click(replyButton);

  // Check if the input for the new comment is displayed
  const replyInput = screen.getByPlaceholderText("type...");
  expect(replyInput).toBeInTheDocument();

  // Type something in the input
  fireEvent.change(replyInput, { target: { value: "New Comment" } });

  // Click on the "REPLY" button again
  fireEvent.click(replyButton);

  // Check if the handleInsertNode function is called with the correct parameters
  expect(mockHandleInsertNode).toHaveBeenCalledWith(1, "New Comment");
});
