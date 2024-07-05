import type { TableProps } from "antd";
import { Button, Popconfirm, Table } from "antd";
import { Link } from 'react-router-dom';

export interface productType {
  _id: string;
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
  handleDelete: (id: string) => void;
  handleUpdate: (id: string) => void;
}

export const productColumns = ({
  handleDelete,
}: ColumnProps): TableProps<productType>["columns"] => [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (images: { url: string, public_id: string }[]) =>
      images.length > 0 ? (
        <img src={images[0].url} alt="product" style={{ width: 50 }} />
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
    render: (status: boolean) => (status ? "Active" : "Disabled"),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: 'center',
    render: (_, row: productType) => (
      <>
        <div style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
        <Link to={`/update-product/${row._id}`}>
          <Button>
            Update
          </Button>
        </Link>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              handleDelete(row._id);
            }}
          >
            <Button>Delete</Button>
          </Popconfirm>
        </div>
      </>
    ),
  },
];

interface ProductTableProps {
  data: productType[];
  handleDelete: (id: string) => void;
  handleUpdate: (id: string) => void;
}
const TableData: React.FC<ProductTableProps> = ({
  data,
  handleDelete,
  handleUpdate,
}) => {
  const columns = productColumns({ handleDelete, handleUpdate });

  return (
    <Table<productType> columns={columns} dataSource={data} rowKey="_id"/>
  );
};

export default TableData;
