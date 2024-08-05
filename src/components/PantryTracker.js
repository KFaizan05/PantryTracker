import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import '../App.css';  // Import App.css

const PantryTracker = () => {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        // Calculate the total quantity whenever items change
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        setTotalQuantity(total);
    }, [items]);

    const handleAddItem = async () => {
        if (itemName && itemQuantity) {
            const newItem = { name: itemName, quantity: parseInt(itemQuantity) };
            setItems(prevItems => [...prevItems, newItem]);
            setItemName('');
            setItemQuantity('');

            try {
                await addDoc(collection(db, 'pantry'), newItem);
            } catch (error) {
                console.error("Error adding document: ", error);
                // Optional: If error, you can remove the item from the UI
                setItems(prevItems => prevItems.filter(item => item !== newItem));
            }
        }
    };

    const handleClearList = async () => {
        setItems([]);

        // Optionally clear items from Firestore
        const querySnapshot = await getDocs(collection(db, 'pantry'));
        querySnapshot.forEach(async (document) => {
            await deleteDoc(doc(db, 'pantry', document.id));
        });
    };

    const fetchItems = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'pantry'));
            const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(itemsList);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    return (
        <div className="container">
            <h1>Pantry Tracker</h1>
            <div>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(e.target.value)}
                />
                <button onClick={handleAddItem}>Add Item</button>
                <button onClick={handleClearList} style={{ marginLeft: '10px' }}>Clear List</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id || index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="total-quantity">
                Total Quantity: {totalQuantity}
            </div>
            <div className="creator">
                Created by Faizan Kalam
            </div>
        </div>
    );
};

export default PantryTracker;
