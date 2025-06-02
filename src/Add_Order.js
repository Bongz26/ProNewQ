import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "https://newqueue-production.up.railway.app"; // ✅ Correct Railway Public Domain

const AddOrder = () => {
    const [transactionID, setTransactionID] = useState("");
    const [clientName, setClientName] = useState("");
    const [clientContact, setClientContact] = useState("");
    const [paintType, setPaintType] = useState("");
    const [colorCode, setColorCode] = useState("");
    const [category, setCategory] = useState("New Mix");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newOrder = { 
            transaction_id: transactionID, 
            customer_name: clientName, 
            client_contact: clientContact, 
            paint_type: paintType, 
            colour_code: category === "New Mix" ? "Pending" : colorCode || "N/A", 
            category, 
            start_time: new Date().toISOString(),
            estimated_completion: "N/A", 
            current_status: "Waiting" 
        };

        try {
            const response = await axios.post(`${BASE_URL}/api/orders`, newOrder);
            
            if (!response.data || !response.data.transaction_id) {
                console.error("🚨 Error: Order data missing in response!");
                return;
            }

            console.log("✅ Order added successfully:", response.data);
        } catch (error) {
            console.error("🚨 Error adding order:", error.message);
        }
    };

    return (
        <div>
            <h2>Add New Order</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={transactionID} onChange={(e) => setTransactionID(e.target.value)} placeholder="Transaction ID" required />
                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client Name" required />
                <input type="text" value={clientContact} onChange={(e) => setClientContact(e.target.value)} placeholder="Client Contact" required />
                <input type="text" value={paintType} onChange={(e) => setPaintType(e.target.value)} placeholder="Paint Type" required />
                <input type="text" value={colorCode} onChange={(e) => setColorCode(e.target.value)} placeholder="Color Code" />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="New Mix">New Mix</option>
                    <option value="Reorder Mix">Reorder Mix</option>
                    <option value="Colour Code">Colour Code</option>
                </select>
                <button type="submit">Submit Order</button>
            </form>
        </div>
    );
};

export default AddOrder;