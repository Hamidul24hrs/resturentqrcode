// Basic interactivity log
console.log('Dashboard loaded successfully!');




// QR Code generation and table handling
const generateQRCodeBtn = document.getElementById('generate-qrcode');
const tableNumberInput = document.getElementById('table-number');
const qrcodeContainer = document.getElementById('qrcode-container');
const qrcodeElement = document.getElementById('qrcode');
const downloadBtn = document.getElementById('download-btn');

// Sample data for restaurant and menu link
const restaurantName = "RestaurantName"; // Modify as per your needs
const menuLink = "https://yourwebsite.com/menu"; // Modify as per your needs

// Function to generate QR Code
generateQRCodeBtn.addEventListener('click', () => {
    const tableNumber = tableNumberInput.value;

    if (!tableNumber) {
        alert("Please enter a table number.");
        return;
    }

    // Generate QR Code based on table number
    const qrData = `https://yourwebsite.com/menu?restaurant=${encodeURIComponent(restaurantName)}&table=${tableNumber}&link=${encodeURIComponent(menuLink)}`;
    new QRCode(qrcodeElement, {
        text: qrData,
        width: 128,
        height: 128
    });

    // Show QR Code container and hide the input section
    qrcodeContainer.classList.remove('hidden');
});

// Function to download the QR Code
downloadBtn.addEventListener('click', () => {
    const qrCodeImage = qrcodeElement.querySelector('img');
    const qrCodeURL = qrCodeImage.src;

    const link = document.createElement('a');
    link.href = qrCodeURL;
    link.download = 'table_qr_code.png';
    link.click();
});

// Order rendering and management
const ordersSection = document.getElementById('orders-section');
const orderList = document.getElementById('order-list');

// Sample Orders for Admin Section
let orders = [
    { orderId: 1, table: 5, items: ['Burger', 'Fries'], status: 'Pending' },
    { orderId: 2, table: 3, items: ['Pizza', 'Coke'], status: 'Pending' },
];

// Function to render orders for admin to approve or cancel
function renderOrders() {
    orderList.innerHTML = '';
    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <span>Table ${order.table}: ${order.items.join(', ')}</span>
            <div>
                <button class="approve" onclick="approveOrder(${order.orderId})">Approve</button>
                <button class="cancel" onclick="cancelOrder(${order.orderId})">Cancel</button>
            </div>
        `;
        orderList.appendChild(orderItem);
}

// Approve order
function approveOrder(orderId) {
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
        order.status = 'Approved';
        alert(`Order for Table ${order.table} approved.`);
        renderOrders();
    }
}

// Cancel order
function cancelOrder(orderId) {
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
        order.status = 'Canceled';
        alert(`Order for Table ${order.table} canceled.`);
        renderOrders();
    }
}

// Initial render of orders for admin
renderOrders();
