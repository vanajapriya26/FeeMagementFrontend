// src/components/common/QRCode.js

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeComponent = () => {
    const paymentData = "Payment details here"; // Replace with actual payment data

    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Scan to Pay</h3>
            <QRCodeSVG value={paymentData} />
        </div>
    );
};

export default QRCodeComponent;