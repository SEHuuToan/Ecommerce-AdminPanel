import type { TableProps } from "antd";
import { Button, Popconfirm, Table } from "antd";
import { Link } from 'react-router-dom';

export interface blogType {
    _id: string,
    title: string,
    header: string,
    body1: string,
    body2: string,
    body3: string,
    image: string[],
    footer: string,
    status: boolean,
}
interface ColumnProps {
    handleDelete: (id: string) => void;
    handleUpdate: (id: string) => void;
}

export const productColumns = ({
    handleDelete,
}: ColumnProps): TableProps<blogType>["columns"] => [
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
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Header",
            dataIndex: "header",
            key: "header",
        },
        {
            title: "Body",
            dataIndex: "body",
            key: "body",
        },
        {
            title: "Footer",
            dataIndex: "footer",
            key: "footer",
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
            render: (_, row: blogType) => (
                <>
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <Link to={`/update-blog/${row._id}`}>
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
    data: blogType[];
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
        <Table<blogType> columns={columns} dataSource={data} rowKey="_id" />
    );
};

export default TableData;
