import { Space, Typography, Card, Table, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import { useEffect, useRef, useState } from "react";
import { FurnitureItem, canvasInit, draw, lstnrs } from "./engine";
const { Meta } = Card;

const furniture = [
    {
        id: 1,
        name: "стол1",
        height: 100,
        width: 100,
        imgUrl: "https://dummyjson.com/icon/emilys/128",
    },
    {
        id: 2,
        name: "стол2",
        height: 50,
        width: 50,
        imgUrl: "https://dummyjson.com/icon/jamesd/128",
    },
    {
        id: 3,
        name: "стол3",
        height: 30,
        width: 30,
        imgUrl: "https://dummyjson.com/icon/emmaj/128",
    },
];

const columns = [
    {
        title: "Наименование",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x",
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y",
    },
];

const Plan = () => {
    const canvasRef = useRef(null);
    const canvasContainerRef = useRef(null);
    const fileInputRef = useRef(null);

    const [furnitureItems, setFurnitureItems] = useState([]);
    const [draggingItem, setDraggingItem] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const dataSource = furnitureItems.map((item, index) => ({
        key: index,
        name: item.name,
        x: item.x,
        y: item.y,
    }));

    useEffect(() => {
        if (canvasRef.current && canvasContainerRef.current) {
            const ctx = canvasInit(
                canvasRef.current,
                canvasContainerRef.current
            );
            draw(ctx, canvasRef.current, furnitureItems);
        }
    }, [furnitureItems]);

    useEffect(() => {
        if (canvasRef.current && canvasContainerRef.current) {
            const removeLstnrs = lstnrs(
                canvasRef.current,
                furnitureItems,
                draggingItem,
                dragOffset,
                setFurnitureItems,
                setDraggingItem,
                setDragOffset
            );

            return () => removeLstnrs();
        }
    }, [furnitureItems, draggingItem, dragOffset]);

    const addFurnitureItem = (width, height, imageUrl, name) => {
        const newItem = new FurnitureItem(
            50,
            50,
            width,
            height,
            imageUrl,
            name
        );
        setFurnitureItems([...furnitureItems, newItem]);
    };

    return (
        <Flex alignItems="start">
            <Space style={{ flex: "0 40%" }}>
                <Space direction="vertical">
                    <Space
                        direction="vertical"
                        style={{
                            padding: "20px",
                            border: "1px solid lightgray",
                            borderRadius: "20px",
                            background: "white",
                        }}
                    >
                        <Typography.Title level={3}>Столы</Typography.Title>
                        <Space>
                            {furniture.map((item) => (
                                <Card
                                    key={item.id}
                                    onClick={() =>
                                        addFurnitureItem(
                                            item.width,
                                            item.height,
                                            item.imgUrl,
                                            item.name
                                        )
                                    }
                                    hoverable
                                    // style={{ width: 100 }}
                                    cover={
                                        <img alt="example" src={item.imgUrl} />
                                    }
                                >
                                    <Meta
                                        title={`Стол ${item.name}`}
                                        style={{ textAlign: "center" }}
                                    />
                                </Card>
                            ))}
                        </Space>
                    </Space>
                    <Space
                        direction="vertical"
                        style={{
                            padding: "20px",
                            border: "1px solid lightgray",
                            borderRadius: "20px",
                            background: "white",
                        }}
                    >
                        <Typography.Title level={1}>
                            Параметры элемента
                        </Typography.Title>

                        <Table
                            pagination={false}
                            bordered
                            dataSource={dataSource}
                            columns={columns}
                            style={{maxHeight: "400px", overflow: "auto"}}
                        />
                    </Space>
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => downloadDataSource(furnitureItems)}
                        >
                            Скачать данные
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={(e) =>
                                handleFileChange(e, setFurnitureItems)
                            }
                            accept=".json"
                        />
                        <Button
                            type="dashed"
                            onClick={() => fileInputRef.current.click()}
                        >
                            Загрузить данные
                        </Button>
                    </Space>
                </Space>
            </Space>
            <div
                style={{ flex: "0 60%", height: "70vh", borderRadius: "20px" }}
                ref={canvasContainerRef}
            >
                <canvas ref={canvasRef} id="canvas"  style={{ borderRadius: "20px" }}></canvas>
            </div>
        </Flex>
    );
};

export default Plan;

const downloadDataSource = (furnitureItems) => {
    const data = furnitureItems.map((item) => ({ ...item.getDataToJSon() }));
    const dataSrc = JSON.stringify(data, null, 2);
    const blob = new Blob([dataSrc], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dataSource.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
};

const handleFileChange = (event, setFurnitureItems) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                const newFurnitureItems = data.map(
                    (item) =>
                        new FurnitureItem(
                            item.x,
                            item.y,
                            item.width,
                            item.height,
                            item.imageUrl,
                            item.name
                        )
                );
                setFurnitureItems(newFurnitureItems);
                message.success("Данные успешно загружены");
            } catch (error) {
                message.error("Ошибка при загрузке данных");
            }
        };
        reader.readAsText(file);
    }
};
