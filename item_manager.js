class ItemManager {
    constructor() {
        this.items = {
            "1": {"name": "Fluke", "inventory_number": 1, "quantity": 1, "available": 1, "checked_out_by": {}},
            "2": {"name": "Laptop", "inventory_number": 2, "quantity": 5, "available": 5, "checked_out_by": {}},
            "3": {"name": "Toner", "inventory_number": 3, "quantity": 3, "available": 3, "checked_out_by": {}}
        };
    }

    displayItems() {
        let itemStatusDiv = document.getElementById('itemStatus');
        let itemStatusHTML = "<h2>Item Status:</h2>";
        for (let key in this.items) {
            let item = this.items[key];
            let checkedOutByStr = "";
            for (let person in item.checked_out_by) {
                checkedOutByStr += `${person}: ${item.checked_out_by[person]}, `;
            }
            checkedOutByStr = checkedOutByStr.slice(0, -2); // Remove trailing comma and space
            if (Object.keys(item.checked_out_by).length > 0) {
                itemStatusHTML += `<p>${item.inventory_number}: ${item.name} - Available: ${item.available}/${item.quantity}, Checked out by: ${checkedOutByStr}</p>`;
            } else {
                itemStatusHTML += `<p>${item.inventory_number}: ${item.name} - Available: ${item.available}/${item.quantity}</p>`;
            }
        }
        itemStatusDiv.innerHTML = itemStatusHTML;
    }

    checkOut(itemKey, personName, quantity) {
        if (this.items[itemKey]) {
            if (this.items[itemKey].available >= quantity) {
                this.items[itemKey].available -= quantity;
                this.items[itemKey].checked_out_by[personName] = (this.items[itemKey].checked_out_by[personName] || 0) + quantity;
                alert(`${quantity} ${this.items[itemKey].name} (Inventory No. ${this.items[itemKey].inventory_number}) checked out successfully by ${personName}.`);
            } else {
                alert(`Not enough quantity available for ${this.items[itemKey].name} (Inventory No. ${this.items[itemKey].inventory_number}).`);
            }
        } else {
            alert("Invalid item key.");
        }
        this.displayItems(); // Update item status after checkout
    }

    checkIn(itemKey, quantity) {
        if (this.items[itemKey]) {
            if (this.items[itemKey].available + quantity <= this.items[itemKey].quantity) {
                this.items[itemKey].available += quantity;
                for (let person in this.items[itemKey].checked_out_by) {
                    if (this.items[itemKey].checked_out_by[person] >= quantity) {
                        this.items[itemKey].checked_out_by[person] -= quantity;
                        if (this.items[itemKey].checked_out_by[person] === 0) {
                            delete this.items[itemKey].checked_out_by[person]; // Remove entry if all checked in
                        }
                        break;
                    } else {
                        quantity -= this.items[itemKey].checked_out_by[person];
                        delete this.items[itemKey].checked_out_by[person]; // Remove entry if all checked in
                    }
                }
                alert(`${quantity} ${this.items[itemKey].name} (Inventory No. ${this.items[itemKey].inventory_number}) checked in successfully.`);
            } else {
                alert(`Cannot check in ${quantity} ${this.items[itemKey].name} (Inventory No. ${this.items[itemKey].inventory_number}). Maximum quantity exceeded.`);
            }
        } else {
            alert("Invalid item key.");
        }
        this.displayItems(); // Update item status after check-in
    }
}

let itemManager = new ItemManager();

function checkOut() {
    let itemKey = document.getElementById('itemKeyCheckOut').value;
    let personName = document.getElementById('personNameCheckOut').value;
    let quantity = parseInt(document.getElementById('quantityCheckOut').value);
    itemManager.checkOut(itemKey, personName, quantity);
}

function checkIn() {
    let itemKey = document.getElementById('itemKeyCheckIn').value;
    let quantity = parseInt(document.getElementById('quantityCheckIn').value);
    itemManager.checkIn(itemKey, quantity);
}

itemManager.displayItems(); // Initial display of items
