export default function header() {
	//data
	let isNavigationOpen = false;

	//query selectors
	const navigationMenu = document.querySelector('.header__mobile-navigation')
	const navigationButton = document.querySelector('.header__mobile-navigation-button');

	//event listeners
	if (navigationButton) {
		navigationButton.addEventListener('click', handleOpenNavigation)
	}

	//event handlers
	function handleOpenNavigation() {
		isNavigationOpen = !isNavigationOpen;

		if (isNavigationOpen === true) {
			navigationButton.classList.remove('header__mobile-navigation-button')
			navigationButton.classList.add('header__mobile-navigation-button--open')

			navigationMenu.classList.remove('header__mobile-navigation')
			navigationMenu.classList.add('header__mobile-navigation--visible')
		} else {
			navigationButton.classList.remove('header__mobile-navigation-button--open')
			navigationButton.classList.add('header__mobile-navigation-button')
			
			navigationMenu.classList.add('header__mobile-navigation')
			navigationMenu.classList.remove('header__mobile-navigation--visible')
		}
	}
}