$(document).ready(function () {
  const dataTableBody = $("#data-body");
  const popup = $("#popup");
  const form = $("#form");
  const editForm = $("#edit-form");
  let editRowId;

  // Show popup form
  function showPopup() {
    popup.show();
  }

  // Hide popup form
  function hidePopup() {
    popup.hide();
    form[0].reset();
    editForm[0].reset();
  }

  // Show edit form popup
  function showEditPopup(id) {
    const row = $(`#row-${id}`);
    const visualizationId = row.find(".visualization-id").text();
    const columns = row.find(".columns").text();
    const sequenceNumber = row.find(".sequence-number").text();
    const isActiveText = row.find(".is-active").text();
    const isActive = isActiveText === "Yes";

    $("#edit-visualizationId").val(visualizationId);
    $("#edit-columns").val(columns);
    $("#edit-sequenceNumber").val(sequenceNumber);
    $("#edit-isActive").prop("checked", isActive);

    popup.show();
    editForm.show();
    form.hide();
  }

  // Hide edit form popup
  function hideEditPopup() {
    popup.hide();
    editForm.hide();
    form.show();
    editForm[0].reset();
  }

  // New Entry button click event
  $("#new-entry-button").click(function () {
    showPopup();
    form.show();
    editForm.hide();
  });

  // Form submission event
  form.submit(function (event) {
    event.preventDefault();

    const visualizationId = parseInt($("#visualizationId").val(), 10);
    const columns = parseInt($("#columns").val(), 10);
    const sequenceNumber = parseInt($("#sequenceNumber").val(), 10);
    const isActive = $("#isActive").is(":checked");

    if (isNaN(visualizationId) || isNaN(columns) || isNaN(sequenceNumber)) {
      alert("Visualization ID, Columns, and Sequence Number must be integers.");
      return;
    }

    const newRow = $("<tr>");
    newRow.attr("id", `row-${dataTableBody.children().length + 1}`);
    newRow.html(`
        <td>${dataTableBody.children().length + 1}</td>
        <td class="visualization-id">${visualizationId}</td>
        <td class="columns">${columns}</td>
        <td class="sequence-number">${sequenceNumber}</td>
        <td class="is-active">${isActive ? "Yes" : "No"}</td>
        <td><button class="edit-button" data-id="${
          dataTableBody.children().length + 1
        }">Edit</button></td>
      `);

    dataTableBody.append(newRow);
    hidePopup();
  });

  // Ajax form submission event
  $(document).on("submit", "#form", function (e) {
    e.preventDefault();

    var ajaxData = $(this).serialize();
    console.log("_", ajaxData);

    $.ajax({
      type: "post",
      url: "/create",
      data: ajaxData,
      success: function (result, status) {
        console.log("result", result);
      },
      error: function (status, err) {
        console.log(err);
      },
    });
  });

  // Edit button click event
  dataTableBody.on("click", ".edit-button", function () {
    const id = $(this).data("id");
    editRowId = id;
    showPopup();
    editForm.show();
    form.hide();
    showEditPopup(id);
  });

  // Update form
  editForm.submit(function (event) {
    event.preventDefault();

    const visualizationId = parseInt($("#edit-visualizationId").val(), 10);
    const columns = parseInt($("#edit-columns").val(), 10);
    const sequenceNumber = parseInt($("#edit-sequenceNumber").val(), 10);
    const isActive = $("#edit-isActive").is(":checked");

    if (isNaN(visualizationId) || isNaN(columns) || isNaN(sequenceNumber)) {
      alert("Visualization ID, Columns, and Sequence Number must be integers.");
      return;
    }

    const row = $(`#row-${editRowId}`);
    row.find(".visualization-id").text(visualizationId);
    row.find(".columns").text(columns);
    row.find(".sequence-number").text(sequenceNumber);
    row.find(".is-active").text(isActive ? "Yes" : "No");

    hideEditPopup();
  });

  // Close button click event
  $("#close-button").click(function () {
    hidePopup();
  });
});$(document).ready(function () {
  const dataTableBody = $("#data-body");
  const popup = $("#popup");
  const form = $("#form");
  const editForm = $("#edit-form");
  let editRowId;

  // Show popup form
  function showPopup() {
    popup.show();
  }

  // Hide popup form
  function hidePopup() {
    popup.hide();
    form[0].reset();
    editForm[0].reset();
  }

  // Show edit form popup
  function showEditPopup(id) {
    const row = $(`#row-${id}`);
    const visualizationId = row.find(".visualization-id").text();
    const columns = row.find(".columns").text();
    const sequenceNumber = row.find(".sequence-number").text();
    const isActiveText = row.find(".is-active").text();
    const isActive = isActiveText === "Yes";

    $("#edit-visualizationId").val(visualizationId);
    $("#edit-columns").val(columns);
    $("#edit-sequenceNumber").val(sequenceNumber);
    $("#edit-isActive").prop("checked", isActive);

    popup.show();
    editForm.show();
    form.hide();
  }

  // Hide edit form popup
  function hideEditPopup() {
    popup.hide();
    editForm.hide();
    form.show();
    editForm[0].reset();
  }

  // New Entry button click event
  $("#new-entry-button").click(function () {
    showPopup();
    form.show();
    editForm.hide();
  });

  // Form submission event
  form.submit(function (event) {
    event.preventDefault();

    const visualizationId = parseInt($("#visualizationId").val(), 10);
    const columns = parseInt($("#columns").val(), 10);
    const sequenceNumber = parseInt($("#sequenceNumber").val(), 10);
    const isActive = $("#isActive").is(":checked");

    if (isNaN(visualizationId) || isNaN(columns) || isNaN(sequenceNumber)) {
      alert("Visualization ID, Columns, and Sequence Number must be integers.");
      return;
    }

    const newRow = $("<tr>");
    newRow.attr("id", `row-${dataTableBody.children().length + 1}`);
    newRow.html(`
        <td>${dataTableBody.children().length + 1}</td>
        <td class="visualization-id">${visualizationId}</td>
        <td class="columns">${columns}</td>
        <td class="sequence-number">${sequenceNumber}</td>
        <td class="is-active">${isActive ? "Yes" : "No"}</td>
        <td><button class="edit-button" data-id="${
          dataTableBody.children().length + 1
        }">Edit</button></td>
      `);

    dataTableBody.append(newRow);
    hidePopup();
  });

  // Ajax form submission event
  $(document).on("submit", "#form", function (e) {
    e.preventDefault();

    var ajaxData = $(this).serialize();
    console.log("_", ajaxData);

    $.ajax({
      type: "post",
      url: "/create",
      data: ajaxData,
      success: function (result, status) {
        console.log("result", result);
      },
      error: function (status, err) {
        console.log(err);
      },
    });
  });

  // Edit button click event
  dataTableBody.on("click", ".edit-button", function () {
    const id = $(this).data("id");
    editRowId = id;
    showPopup();
    editForm.show();
    form.hide();
    showEditPopup(id);
  });

  // Update form
  editForm.submit(function (event) {
    event.preventDefault();

    const visualizationId = parseInt($("#edit-visualizationId").val(), 10);
    const columns = parseInt($("#edit-columns").val(), 10);
    const sequenceNumber = parseInt($("#edit-sequenceNumber").val(), 10);
    const isActive = $("#edit-isActive").is(":checked");

    if (isNaN(visualizationId) || isNaN(columns) || isNaN(sequenceNumber)) {
      alert("Visualization ID, Columns, and Sequence Number must be integers.");
      return;
    }

    const row = $(`#row-${editRowId}`);
    row.find(".visualization-id").text(visualizationId);
    row.find(".columns").text(columns);
    row.find(".sequence-number").text(sequenceNumber);
    row.find(".is-active").text(isActive ? "Yes" : "No");

    hideEditPopup();
  });

  // Close button click event
  $("#close-button").click(function () {
    hidePopup();
  });
});