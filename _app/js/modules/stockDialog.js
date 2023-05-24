export default function stockDialog() {
	const addStockDialog = document.querySelector('.add-stock__dialog');
	const addStockButton = document.querySelector('.add-stock__button');
	const addStockClose = document.querySelector('.add-stock__close');
	const addButton = document.querySelector('.add-stock__dialog-add-button');

	const stockTickerInput = document.querySelector('#stock-ticker');
	const quantityInput = document.querySelector('#quantity');
	const costInput = document.querySelector('#cost');

	addStockButton.addEventListener('click', handleOpenAddStockDialog)
	addStockClose.addEventListener('click', handleCloseAddStockDialog)
	addButton.addEventListener('click', handleSubmitStock)
	addStockDialog.addEventListener('click', handleClickOutsideDialog)

	// This function closes the dialog window if you click anywhere else.
	// source: https://codepen.io/dvdvdmt/pen/BaavWbp
	function handleClickOutsideDialog(event) {
		if (event.target === addStockDialog) {
			addStockDialog.close()
		}
	}

	function handleOpenAddStockDialog() {
		addStockDialog.showModal();
	}

	function handleCloseAddStockDialog() {
		addStockDialog.close();
	}

	function handleSubmitStock() {
		setStockValuesInLocalStorage()
		addStockDialog.close();
	}

	function setStockValuesInLocalStorage() {
		const stockTickerInputValue = stockTickerInput.value.toUpperCase();
		const quantityInputValue = quantityInput.value;
		const costInputValue = costInput.value;

		let stockObject = {
			'stockTicker': stockTickerInputValue,
			'quantity': quantityInputValue,
			'cost': costInputValue
		}
		// source: https://stackoverflow.com/a/59202935
		let localData =  localStorage.getItem('stockList');
		if (localData) {
			localData = JSON.parse(localData);
		} else {
			localData = []
		}
		localData.push(stockObject)
		localStorage.setItem('stockList', JSON.stringify(localData))

		location.reload() //Refreshes window after clicking on 'add' button

		//Resets all input fields
		stockTickerInput.value = null;
		quantityInput.value = null;
		costInput.value = null;
	}
}