export class FurnitureItem {
    constructor(x, y, width, height, imageUrl = null, name) {
        this.x = x;
        this.y = y;
        this.name = "стол";
        this.width = width;
        this.height = height;
        this.imgUrl = imageUrl;
        this.img = new Image();
        this.img.src = imageUrl;
        this.name = name;
    }

    getDataToJSon() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            imageUrl: this.imgUrl,
            name: this.name,
        };
    }
    draw(ctx) {
        if (this.img.complete) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
            this.img.onload = () => {
                ctx.drawImage(
                    this.img,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            };
        }

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    getCoordinates() {
        return { x: this.x, y: this.y };
    }

    isPointInside(px, py) {
        return (
            px >= this.x &&
            px <= this.x + this.width &&
            py >= this.y &&
            py <= this.y + this.height
        );
    }
}

export function canvasInit(canvasElement, canvasContainer) {
    const ctx = canvasElement.getContext("2d");
    canvasElement.width = canvasContainer.offsetWidth;
    canvasElement.height = canvasContainer.offsetHeight;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    return ctx;
}

export function draw(ctx, canvasElement, items) {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    items.forEach((item) => item.draw(ctx));
}

export function lstnrs(
    canvasElement,
    furnitureItems,
    draggingItem,
    dragOffset,
    setFurnitureItems,
    setDraggingItem,
    setDragOffset
) {
    const handleMouseDown = (e) => {
        const rect = canvasElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const item = furnitureItems.find((item) => item.isPointInside(x, y));
        if (item) {
            setDraggingItem(item);
            setDragOffset({ x: x - item.x, y: y - item.y });
        }
    };

    const handleMouseMove = (e) => {
        if (draggingItem) {
            const rect = canvasElement.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            draggingItem.move(
                x - dragOffset.x - draggingItem.x,
                y - dragOffset.y - draggingItem.y
            );
            setFurnitureItems([...furnitureItems]);
        }
    };

    const handleMouseUp = () => {
        setDraggingItem(null);
    };

    canvasElement.addEventListener("mousedown", handleMouseDown);
    canvasElement.addEventListener("mousemove", handleMouseMove);
    canvasElement.addEventListener("mouseup", handleMouseUp);

    return () =>
        [
            () =>
                canvasElement.removeEventListener("mousedown", handleMouseDown),
            () =>
                canvasElement.removeEventListener("mousemove", handleMouseMove),
            () => canvasElement.removeEventListener("mouseup", handleMouseUp),
        ].forEach((lstnr) => lstnr());
}
