document.addEventListener ('DOMContentLoaded', function () {
  const notificationBell = document.getElementById ('headerNotification');
  const notificationPanel = document.getElementsByClassName (
    'notification-panel'
  )[0];
  const menus = document.getElementById ('menu-btn');
  const listItem = document.querySelectorAll ('.menu-list__items');
  const linkList = document.querySelectorAll ('a');
  const menu = document.getElementsByClassName ('header__avatar');
  const menu_desktop = document.getElementsByClassName (
    'header__avatar-desktop'
  );
  const menuPanel = document.getElementsByClassName ('header__nav')[0];
  const CallOutCloseBtn = document.getElementById ('callout-close');
  const calloutPanel = document.getElementById ('callout__subscription_card');
  const cardUpBtn = document.getElementById ('card-up-btn');
  const cardDownBtn = document.getElementById ('card-down-btn');
  const setupGuideCard = document.getElementsByClassName (
    'main__subscription-guide__info-menu'
  )[0];
  const onboardingSteps = document.querySelectorAll (
    '.main__subscription-guide__info'
  );
  const onboardingStepsInfo = document.querySelectorAll (
    '.main__subscription-guide__info-details div'
  );
  const onboardingStepsImage = document.querySelectorAll (
    '.main__subscription-guide__info-icon'
  );
  const searchBox = document.getElementById ('searchBox');
  const inputField = document.querySelector ('.header__search-input');

  const checkList = document.querySelectorAll ('.to-check');
  const checkLoadingList = document.querySelectorAll ('.check-loading');
  const checkedList = document.querySelectorAll ('.checked');

  const progressBar = document.getElementById ('progressBar');

  const progressValue = document.getElementById ('currentProgress');

  const allMenuBtn = [menu_desktop[0], menu[0]];
  const listItems = [menus, ...listItem];

  // Function to update focus based on arrow key navigation
  function navigateList (direction, previousFocusIndex, itemsList) {
    const newIndex = previousFocusIndex + direction;
    setFocus (newIndex, itemsList, previousFocusIndex);
  }

  // Function to set focus to a specific index
  function setFocus (index, itemsList) {
    if (index >= 0 && index < itemsList.length) {
      itemsList[index].focus ();
    }

    if (index == itemsList.length) {
      index = 0;
      itemsList[index].focus ();
    }
  }

  inputField.addEventListener ('focus', function () {
    searchBox.classList.add ('focused-light');
  });

  inputField.addEventListener ('blur', function () {
    searchBox.classList.remove ('focused-light');
  });

  function toggleMenuPanel () {
    menuPanel.classList.toggle ('non-active');
    allMenuBtn.forEach (item => {
      return item.setAttribute ('aria-expanded',  `${menuPanel.classList.contains('non-active') ? "false" : "true"}`);
    });
    menuPanel.setAttribute ('aria-hidden', `${menuPanel.classList.contains('non-active') ? "true" : "false"}`);
  }

  allMenuBtn.forEach (item => {
    item.addEventListener ('click', toggleMenuPanel);
    item.addEventListener ('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault ();
        toggleMenuPanel ();
      }
    });
    item.addEventListener ('keydown', function (event) {
      if (event.key === ' ') {
        event.preventDefault ();
        toggleMenuPanel ();
      }
    });
  });

  linkList.forEach (item => {
    item.addEventListener ('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        window.location.href = item.href;
      }
    });
  });

  function toggleNotificationPanel () {
    notificationPanel.classList.toggle ('non-active');
    
    notificationBell.setAttribute ('aria-expanded', `${notificationPanel.classList.contains ('non-active') ? "false" : "true"}`);
    notificationPanel.setAttribute ('aria-hidden', `${notificationPanel.classList.contains ('non-active') ? "true" : "false"}`);
  }

  // Toggle the panel when clicking the notification bell
  notificationBell.addEventListener ('click', toggleNotificationPanel);

  // Toggle the panel when pressing the Enter key on the notification bell for Keyboard-only Users
  notificationBell.addEventListener ('keydown', function (event) {
    if (event.key === 'Enter') {
      toggleNotificationPanel ();
    }
  });

  notificationBell.addEventListener ('keydown', function (event) {
    if (event.key === ' ') {
      toggleNotificationPanel ();
    }
  });

  // Close the panel when clicking outside the notification panel and bell
  document.addEventListener ('click', function (event) {
    if (
      !notificationBell.contains (event.target) &&
      !notificationPanel.contains (event.target)
    ) {
      notificationPanel.classList.add ('non-active');
    }
  });

  document.addEventListener ('keydown', function (event) {
    if (
      !notificationBell.contains (event.target) &&
      !notificationPanel.contains (event.target)
    ) {
      notificationPanel.classList.add ('non-active');
    }
  });

  // Add keydown event listener to the listItems
  listItems.forEach ((item, index) => {
    item.addEventListener ('keydown', function (event) {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault (); // Prevent scrolling
          navigateList (-1, index, listItems);
          break;
        case 'ArrowDown':
          event.preventDefault (); // Prevent scrolling
          navigateList (1, index, listItems);
          break;
      }
    });
  });

  function removeCalloutPanel () {
    calloutPanel.classList.add ('non-active');
    const isOpen = calloutPanel.classList.contains ('non-active');
    calloutPanel.setAttribute ('aria-hidden', isOpen);
    cardDownBtn.focus();
    cardUpBtn.focus();
  }

  CallOutCloseBtn.addEventListener ('click', removeCalloutPanel);
  CallOutCloseBtn.addEventListener ('keydown', function (event) {
    if (event.key === 'Enter') {
      removeCalloutPanel ();
    }
  });
  CallOutCloseBtn.addEventListener ('keydown', function (event) {
    if (event.key === ' ') {
      removeCalloutPanel ();
    }
  });

  function closeSetupCard () {
    setupGuideCard.classList.add ('non-active');
    cardDownBtn.classList.remove ('non-active');
    cardDownBtn.focus ();
    cardUpBtn.classList.add ('non-active');
    const isOpen = setupGuideCard.classList.contains ('non-active');

    cardDownBtn.setAttribute ('aria-expanded', `${setupGuideCard.classList.contains ('non-active') ? "false" : "true"}`);
    cardUpBtn.setAttribute ('aria-expanded', `${setupGuideCard.classList.contains ('non-active') ? "false" : "true"}`);
    setupGuideCard.setAttribute ('aria-hidden', isOpen);
  }

  function openSetupCard () {
    setupGuideCard.classList.remove ('non-active');
    cardDownBtn.classList.add ('non-active');
    cardUpBtn.classList.remove ('non-active');
    cardUpBtn.focus ();
    const isOpen = setupGuideCard.classList.contains ('non-active');

    cardUpBtn.setAttribute ('aria-expanded', `${setupGuideCard.classList.contains ('non-active') ? "false" : "true"}`);
    cardDownBtn.setAttribute ('aria-expanded', `${setupGuideCard.classList.contains ('non-active') ? "false" : "true"}`);
    setupGuideCard.setAttribute ('aria-hidden', isOpen);
  }

  cardUpBtn.addEventListener ('click', closeSetupCard);

  cardDownBtn.addEventListener ('click', openSetupCard);

  cardUpBtn.addEventListener ('keydown', function (event) {
    if (event.key === 'Enter') {
      closeSetupCard ();
    }
  });
  cardUpBtn.addEventListener ('keydown', function (event) {
    if (event.key === ' ') {
      closeSetupCard ();
    }
  });

  cardDownBtn.addEventListener ('keydown', function (event) {
    if (event.key === 'Enter') {
      openSetupCard ();
    }
  });
  cardDownBtn.addEventListener ('keydown', function (event) {
    if (event.key === ' ') {
      openSetupCard ();
    }
  });

  function toggleOnboardingSteps (currentStep) {
    onboardingStepsInfo.forEach (infoList => {
      const infoListNumber = infoList.dataset.list_info;

      if (infoListNumber !== currentStep) {
        infoList.classList.add ('non-active');
        onboardingSteps[infoListNumber - 1].classList.remove ('active');
        onboardingStepsImage[infoListNumber - 1].classList.add ('non-active');
      }

      onboardingStepsInfo[currentStep - 1].classList.remove ('non-active');
      onboardingStepsImage[currentStep - 1].classList.remove ('non-active');
    });
  }

  onboardingSteps.forEach (list => {
    list.addEventListener ('click', function () {
      const currentStep = this.dataset.list;

      // Close all other steps
      toggleOnboardingSteps (currentStep);

      // add the active class for the clicked step
      this.classList.add ('active');
    });

    let onboardingFocusedIndex = -1;

    // Add click event listener to each list item
    onboardingStepsInfo.forEach ((step, index) => {
      step.addEventListener ('keydown', () => {
        setFocus (index, onboardingStepsInfo, onboardingFocusedIndex);
      });
    });

    // Add keydown event listener to the onBoardingSteps
    onboardingSteps.forEach ((item, index) => {
      item.addEventListener ('keydown', function (event) {
        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault (); // Prevent scrolling
            navigateList (-1, index, onboardingSteps);
            break;
          case 'ArrowDown':
            event.preventDefault (); // Prevent scrolling
            navigateList (1, index, onboardingSteps);
            break;
        }
      });
    });

    list.addEventListener ('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault ();
        const currentStep = this.dataset.list;

        // Close all other steps
        toggleOnboardingSteps (currentStep);

        this.classList.add ('active');
        // add the active class for the clicked step
      }
      if (event.key === ' ') {
        event.preventDefault ();
        const currentStep = this.dataset.list;

        // Close all other steps
        toggleOnboardingSteps (currentStep);

        this.classList.add ('active');
        // add the active class for the clicked step
      }
    });
  });

  function checkCompleteSetupProgress () {
    const newCheckedList = [...checkedList];
    let checked = [];
    checked = newCheckedList.filter (checked => {
      if (!checked.classList.contains ('non-active')) {
        return checked;
      }
    });

    progressValue.innerHTML = checked.length;
    progressBar.style.width = `${checked.length * 20}%`;
  }

  function toggleCompleteSetupProgress (index, event = '') {
    // Set up the interval
    let loadingTimer = setInterval (() => {
      // Code to be executed at intervals
      checkList[index].classList.add ('non-active');
      checkLoadingList[index].setAttribute('aria-busy', 'true');
      checkLoadingList[index].classList.remove ('non-active');
    }, 300);

    // Clear the interval and toggle classes after a specified time
    setTimeout (() => {
      clearInterval (loadingTimer);
      checkLoadingList[index].setAttribute('aria-busy', 'false');
      checkLoadingList[index].classList.add ('non-active');
      checkList[index].classList.add ('non-active');
      checkedList[index].classList.remove ('non-active');
      checkList[index].setAttribute('aria-checked', 'true');
    checkedList[index].setAttribute('aria-checked', 'true');
      if (event.key === ' ' || event.key === 'Enter') {
        checkedList[index].focus ();
      }
      checkCompleteSetupProgress ();
    }, 800);
  }

  function toggleUndoCompleteSetupProgress (index, event = '') {
    // Set up the interval
    let loadingTimer = setInterval (() => {
      // Code to be executed at intervals
      checkedList[index].classList.add ('non-active');
      checkLoadingList[index].setAttribute('aria-busy', 'true');
      checkLoadingList[index].classList.remove ('non-active');
    }, 300);

    // Clear the interval and toggle classes after a specified time
    setTimeout (() => {
      clearInterval (loadingTimer);
      checkLoadingList[index].setAttribute('aria-busy', 'false');
      checkLoadingList[index].classList.add ('non-active');
      checkedList[index].classList.add ('non-active');
      checkList[index].classList.remove ('non-active');
      checkList[index].setAttribute('aria-checked', 'false');
    checkedList[index].setAttribute('aria-checked', 'false');
      if (event.key === ' ' || event.key === 'Enter') {
        checkList[index].focus ();
      }
      checkCompleteSetupProgress ();
    }, 800);
  }

  checkList.forEach ((check, index) => {
    check.addEventListener ('click', () => {
      toggleCompleteSetupProgress (index);
    });
  });

  checkedList.forEach ((checked, index) => {
    checked.addEventListener ('click', () => {
      toggleUndoCompleteSetupProgress (index);
    });
  });

  checkList.forEach ((check, index) => {
    check.addEventListener ('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault ();
        toggleCompleteSetupProgress (index, event);
      }
      if (event.key === ' ') {
        event.preventDefault ();
        toggleCompleteSetupProgress (index, event);
      }
    });
  });

  checkedList.forEach ((checked, index) => {
    checked.addEventListener ('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault ();
        toggleUndoCompleteSetupProgress (index, event);
      }
      if (event.key === ' ') {
        event.preventDefault ();
        toggleUndoCompleteSetupProgress (index, event);
      }
    });
  });
});
