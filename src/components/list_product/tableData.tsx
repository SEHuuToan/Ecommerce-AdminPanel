import type { TableProps } from "antd";
import { Button, Popconfirm, Table } from "antd";

interface productType {
  id: string;
  name: string;
  odo: string;
  color: string;
  model: string;
  brand: string;
  option: string;
  description: string;
  category: string;
  image: string[];
  price: number;
  status: boolean;
}
interface ColumnProps {
  handleDelete: (row: productType) => void;
}

export const productColumns = ({
  handleDelete,
}: ColumnProps): TableProps<productType>["columns"] => [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (images: string[]) =>
      images.length > 0 ? (
        <img src={images[0]} alt="product" style={{ width: 50 }} />
      ) : (
        "No Image"
      ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: boolean) => (status ? 'Active' : 'Disabled'),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, row: productType) => (
      <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(row)}>
        <Button>Delete</Button>
      </Popconfirm>
    ),
  },
];

interface ProductTableProps {
  data: productType[];
  handleDelete: (row: productType) => void;
}
const TableData: React.FC<ProductTableProps> = ({ data, handleDelete }) => {
  const columns = productColumns({ handleDelete });

  return <Table<productType> columns={columns} dataSource={data} rowKey="id" />;
};

export default TableData;
