document.getElementById("orderForm").addEventListener("submit", AddOrder);
async function AddOrder(e) {
  e.preventDefault();
  // get type, name, date, and amount
  let tableNumber = document.getElementById("table").value;
  let dish = document.getElementById("dish").value;
  let amount = document.getElementById("amount").value;
  if (tableNumber != "ChooseOne" && dish.length > 0 && amount > 0) {
    const order = {
      tableNumber,
      dish,
      amount,
    };
    //crud-create,read,update,delete
    await axios.post(
      "https://crudcrud.com/api/d685787eb34546f1b9e37fe2f780874d/expenseData",
      order
    );
  }
  document.getElementById("orderForm").reset();
  showOrders();
}

async function showOrders() {
  const tableOne = document.getElementById("table1");
  const tableTwo = document.getElementById("table2");
  const tableThree = document.getElementById("table3");
  const orderTable = [tableOne, tableTwo, tableThree];
  for (let i = 0; i < orderTable.length; i++) {
    orderTable[i].innerHTML = "";
  }
  await axios
    .get(
      "https://crudcrud.com/api/d685787eb34546f1b9e37fe2f780874d/expenseData"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        let table = document.getElementById(
          `table${response.data[i].tableNumber}`
        );
        if (table) {
          table.innerHTML += `
                <tr>
                    <td><li></td>
                    <td>${response.data[i].dish}</td>
                    <td>₹ ${response.data[i].amount}</td>
                    <td><button class="btn btn-danger" onclick="deleteOrder('${response.data[i]._id}')">
                      Delete</button></td>
                </tr>
            `;
        }
      }
    });
}
async function deleteOrder(_id) {
  await axios
    .delete(
      `https://crudcrud.com/api/d685787eb34546f1b9e37fe2f780874d/expenseData/${_id}`
    )
    .then(showOrders);
}
showOrders();