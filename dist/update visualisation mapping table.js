function updateRow(updateButton) {
  var row = updateButton.parentNode.parentNode;

  // Get the data from the row
  var id = row.cells[0].textContent;
  var userId = row.cells[1].querySelector('input').value;
  var visualizationId = row.cells[2].querySelector('input').value;
  var columns = row.cells[3].querySelector('input').value;
  var sequenceNumber = row.cells[4].querySelector('input').value;
  var isActive = row.cells[5].querySelector('input').checked;

  // Prepare the data object to be sent to the server
  var data = {
    id: id,
    user_id: userId,
    visualization_id: visualizationId,
    columns: columns,
    sequence_number: sequenceNumber,
    is_active: isActive
  };

  // Make the AJAX call to update the data
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/updateRow', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log('Row updated successfully');
        // Update the table UI if needed
      } else {
        console.log('Failed to update row');
      }
    }
  };
  xhr.send(JSON.stringify(data));
}
