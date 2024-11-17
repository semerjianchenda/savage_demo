var edit = document.getElementsByClassName("fa-pencil");
var trash = document.getElementsByClassName("fa-trash");

// Delete functionality
Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const item = this.getAttribute('data-item'); // Get item name from data attribute
    fetch('/intolerances', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item: item, // Send the item to delete
      }),
    }).then(function (response) {
      if (response.ok) {
        window.location.reload(); // Reload page on success
      } else {
        console.error('Failed to delete');
      }
    });
  });
});

// Edit functionality
Array.from(edit).forEach(function (element) {
  element.addEventListener('click', function () {
    const oldItem = this.getAttribute('data-item'); // Get current item name
    const newItem = prompt('Edit your intolerance:', oldItem); // Ask user for new value

    if (newItem && newItem !== oldItem) {
      fetch('/intolerances', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldItem: oldItem, // Send old item
          newItem: newItem, // Send updated item
        }),
      }).then(function (response) {
        if (response.ok) {
          window.location.reload(); // Reload page on success
        } else {
          console.error('Failed to edit');
        }
      });
    }
  });
});