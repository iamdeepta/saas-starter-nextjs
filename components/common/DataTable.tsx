"use client";

import { Flex, Table, TableColumnsType, TableProps, Tag } from "antd";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface ResponseType {
  data: {
    data: DataType[];
    totalBlogs: number;
    currentPage: number;
    totalPage: number;
    limit: number;
  };
}

interface DataType {
  id: number;
  title: string;
  slug: string;
  featureImage: string;
  state: string;
  tags: string[];
}

interface ColumnDataType {
  key: React.Key;
  title: string;
  slug: string;
  featureImage: ReactNode;
  state: string;
  tags: string;
  action: ReactNode;
}

const DataTable = ({ data }: ResponseType) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: TableColumnsType<ColumnDataType> = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "TITLE",
      dataIndex: "title",
      sorter: true,
    },
    { title: "SLUG", dataIndex: "slug", sorter: true },
    { title: "FEATUREIMAGE", dataIndex: "featureimage" },
    { title: "STATE", dataIndex: "state", sorter: true },
    {
      title: "TAGS",
      dataIndex: "tags",
      render: (_, { tags }: any) => (
        <>
          {tags?.map((tag: string) => {
            let color = tag === "Pending" ? "volcano" : "green";
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: () => (
        <div className="flex gap-3">
          <Link href={"/dashboard/blog-posts"}>
            <Pencil size={16} className="text-green-500" />
          </Link>
          <Link href={"/dashboard/blog-posts"}>
            <Trash size={16} className="text-red-500" />
          </Link>
        </div>
      ),
    },
  ];

  const dataSource: ColumnDataType[] = data?.data?.map(
    (item: DataType, i: number) => ({
      key: i,
      id: item?.id,
      title: item?.title,
      slug: item?.slug,
      featureImage: (
        <Image
          src={item?.featureImage}
          alt={item?.title}
          width={50}
          height={50}
        />
      ),
      state: item?.state,
      tags: item?.tags?.join(", "),
      action: (
        <div className="flex gap-3">
          <Link href={"/dashboard/blog-posts"}>
            <Pencil size={16} className="text-green-500" />
          </Link>
          <Link href={"/dashboard/blog-posts"}>
            <Trash size={16} className="text-red-500" />
          </Link>
        </div>
      ),
    })
  );

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<ColumnDataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
      />
    </Flex>
  );
};

export default DataTable;
