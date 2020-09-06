import React from "react";
import { Table } from "antd";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { MenuOutlined } from "@ant-design/icons";
import arrayMove from "array-move";

import { useSelector, useDispatch } from "react-redux";
import { selectAllItemsWithIndex, reorderItems } from "./itemsSlice";

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />
));

const columns = [
  {
    title: "Sort",
    dataIndex: "sort",
    width: 30,
    className: "drag-visible",
    render: () => <DragHandle />,
  },
  {
    title: "Content",
    dataIndex: "content",
    className: "drag-visible",
  },
];

const SortableItem = SortableElement((props) => <tr {...props} />);
const SortableList = SortableContainer((props) => <tbody {...props} />);

const SortableTable = (props) => {
  const dispatch = useDispatch(useDispatch);
  const dataSource = useSelector(selectAllItemsWithIndex);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove(
        [].concat(dataSource),
        oldIndex,
        newIndex
      ).filter((el) => !!el);

      dispatch(reorderItems(newData));
    }
  };

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => x.index === restProps["data-row-key"]
    );

    return <SortableItem index={index} {...restProps} />;
  };

  const DraggableContainer = (props) => (
    <SortableList
      useDragHandle
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  return (
    <Table
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      rowKey="index"
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  );
};

export default SortableTable;
