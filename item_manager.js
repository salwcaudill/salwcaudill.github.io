let allAssets;

    axios.get('http://10.194.20.139:55160/api/allassets', {
    headers: {
    'Authorization': 'TxaSHFRTL7xNx2H82seWMj5fMbMYXkDM',
    'Content-Type': 'application/json' 
            },
})
  .then(res => {
    allAssets = res.data; // Store the returned data in allAssets
    console.log(allAssets); // Check if the data is fetched correctly
})
  .catch(e => {
    console.log(e);
  // Handle error
});
// Function to check if asset tag already exists
const assetTagExists = (tag) => {
    return allAssets.some(asset => asset.asset_tag === tag);
};

const displayAssetInfo = (tag) => {
    // Find the asset with the provided tag
    const existingAsset = allAssets.find(asset => asset.asset_tag === tag);

    // Display asset info
    document.getElementById('assetTagInput').val = existingAsset.asset_tag;
    document.getElementById('assetNameInput').val = existingAsset.asset_name;
    document.getElementById('serialInput').val = existingAsset.serial;
    document.getElementById('deviceTypeInput').val = existingAsset.device_type;
    document.getElementById('locationInput').val = existingAsset.location;
    document.getElementById('assignedToInput').val = existingAsset.assigned_to;
};

// Function to submit form
const submitForm = () => {
    // Make POST request with input field values
    const data = {
        asset_tag: $('#assetTagInput').val(),
        asset_name: $('#assetNameInput').val(),
        serial: $('#serialInput').val(),
        device_type: $('#deviceTypeInput').val(),
        location: $('#locationInput').val(),
        assigned_to: $('#assignedToInput').val()
    }
    console.log(data)
    axios.post('http://10.194.20.139:55160/api/insertasset', data, {
        headers: {
            'Authorization': 'TxaSHFRTL7xNx2H82seWMj5fMbMYXkDM',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        // Handle POST response
        console.log('worked');
        window.location.href = "tempdes.html";
    })
    .catch(error => {
        console.log(error); // Handle error
    });
};


// class ItemManager {
//     constructor() {
//         this.items = {
//             "1": {"name": "Fluke", "inventory_number": 1, "quantity": 1, "available": 1, "checked_out_by": {}},
//             "2": {"name": "Laptop", "inventory_number": 2, "quantity": 5, "available": 5, "checked_out_by": {}},
//             "3": {"name": "Toner", "inventory_number": 3, "quantity": 3, "available": 3, "checked_out_by": {}}
//         };
//     }

//     displayItems() {
//         let itemStatusDiv = document.getElementById('itemStatus');
//         let itemStatusHTML = "<h2>Item Status:</h2>";
//         for (let key in this.items) {
//             let item = this.items[key];
//             let checkedOutByStr = "";
//             for (let person in item.checked_out_by) {
//                 checkedOutByStr += `${person}: ${item.checked_out_by[person]}, `;
//             }
//             checkedOutByStr = checkedOutByStr.slice(0, -2); // Remove trailing comma and space
//             if (Object.keys(item.checked_out_by).length > 0) {
//                 itemStatusHTML += `<p>${item.inventory_number}: ${item.name} - Available: ${item.available}/${item.quantity}, Checked out by: ${checkedOutByStr}</p>`;
//             } else {
//                 itemStatusHTML += `<p>${item.inventory_number}: ${item.name} - Available: ${item.available}/${item.quantity}</p>`;
//             }
//         }
//         itemStatusDiv.innerHTML = itemStatusHTML;
//     }

//     checkOut(itemKey, personName, quantity) {
//         if (this.items[itemKey]) {
//             if (this.items[itemKey].available >= quantity) {
//                 this.items[itemKey].available -= quantity;
//                 this.items[itemKey].checked_out_by[personName] = (this.items[itemKey].checked_out_by[personName] || 0) + quantity;
//                 alert(`${quantity} ${this.items[itemKey].name} (Inventory No. ${this.items[itemKey].inventory_number}) checked out successfully by ${personName}.`);
//             } else {
//                 alert(`Not enough quantity available for ${this.items[itemKey].name} (Inventory No. ${this.items[itemKey].inventory_number}).`);
//             }
//         } else {
//             alert("Invalid item key.");
//         }
//         this.displayItems(); // Update item status after checkout
//     }

//     checkIn(itemKey, quantity) {
//         if (this.items[itemKey]) {
//             if (this.items[itemKey].available + quantity <= this.items[itemKey].quantity) {
//                 this.items[itemKey].available += quantity;
//                 for (let person in this.items[itemKey].checked_out_by) {
//                     if (this.items[itemKey].checked_out_by[person] >= quantity) {
//                         this.items[itemKey].checked_out_by[person] -= quantity;
//                         if (this.items[itemKey].checked_out_by[person] === 0) {
//                             delete this.items[itemKey].checked_out_by[person]; // Remove entry if all checked in
//                         }
//                         break;
//                     } else {
//                         quantity -= this.items[itemKey].checked_out_by[person];
//                         delete this.items[itemKey].checked_out_by[person]; // Remove entry if all checked in
//                     }
//                 }
//                 alert(`${quantity} ${this.items[itemKey].name} (Inventory No. ${this.items[itemKey].inventory_number}) checked in successfully.`);
//             } else {
//                 alert(`Cannot check in ${quantity} ${this.items[itemKey].name} (Inventory No. ${this.items[itemKey].inventory_number}). Maximum quantity exceeded.`);
//             }
//         } else {
//             alert("Invalid item key.");
//         }
//         this.displayItems(); // Update item status after check-in
//     }
// }

// let itemManager = new ItemManager();

// function checkOut() {
//     let itemKey = document.getElementById('itemKeyCheckOut').value;
//     let personName = document.getElementById('personNameCheckOut').value;
//     let quantity = parseInt(document.getElementById('quantityCheckOut').value);
//     itemManager.checkOut(itemKey, personName, quantity);
// }

// function checkIn() {
//     let itemKey = document.getElementById('itemKeyCheckIn').value;
//     let quantity = parseInt(document.getElementById('quantityCheckIn').value);
//     itemManager.checkIn(itemKey, quantity);
// }

// itemManager.displayItems(); // Initial display of items
