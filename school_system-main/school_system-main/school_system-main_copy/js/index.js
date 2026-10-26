var phpurl = "php/controllers/index.php";

$(document).ready(function () {
    loadStudents();
    
    $("#formEditStudent").on('submit', function(e) {
        e.preventDefault();
        updateStudent();
    });

    function loadStudents() {
        $.get(phpurl, { opt: '1' }, function (res) {
            var response = typeof res === 'string' ? JSON.parse(res) : res;
            var tbody = $('#studentTableBody');
            tbody.empty();
            
            makeToast("Welcome To The Student Management System");

            if (response.status === 'success' && response.data.length > 0) {
                $.each(response.data, function (index, student) {
                    var row = `
                        <tr>
                            <td>${student.student_id}</td>
                            <td>${student.first_name}</td>
                            <td>${student.last_name}</td>
                            <td>${student.dob}</td>
                            <td>${student.email}</td>
                            <td>${student.gender}</td>
                            <td><span class="badge badge-class rounded-pill px-2 py-1">${student.class}</span></td>
                            <td class="text-end">
                            <button class='btn btn-outline-warning btn-sm btn-edit' attr-fn='${student.first_name}' attr-ln='${student.last_name}' attr-db='${student.dob}' attr-em='${student.email}' attr-cl='${student.class}' attr-gn='${student.gender}' attr-id='${student.student_id}'><i class="bi bi-pencil-fill"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-danger btn-delete" data-id="${student.student_id}">
                                    <i class="bi bi-trash3-fill"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                    tbody.append(row);
                });
            } else {
                tbody.html('<tr><td colspan="7" class="text-center py-4 text-muted">No students found.</td></tr>');
            }
        }, 'json');
    }

    $('#formAddStudent').on('submit', function (e) {
        e.preventDefault();
        
        makeToastGreen("Student Succsessfully inserted");
        
        var formData = {
            opt: '2',
            first_name: $('#firstName').val(),
            last_name: $('#lastName').val(),
            dob: $('#dob').val(),
            email: $('#email').val(),
            class: $('#classInput').val(),
            gender: $('#gender').val()
        };

        $.post(phpurl, formData, function (res) {
            var response = typeof res === 'string' ? JSON.parse(res) : res;

            if (response.status === 'success') {
                $('#formAddStudent')[0].reset();
                var modal = bootstrap.Modal.getInstance(document.getElementById('modalAddStudent'));
                if (modal) {
                    modal.hide();
                }
                
                loadStudents();
            } else {
                alert(response.message);
            }
        }, 'json');
    });

    $(document).on('click', '.btn-delete', function () {
        var studentId = $(this).data('id');
        
        makeToastRed("Student Successfully Deleted");

        if (confirm("Are you sure you want to delete this student?")) {
            $.post(phpurl, { opt: '3', id: studentId }, function (res) {
                var response = typeof res === 'string' ? JSON.parse(res) : res;

                if (response.status === 'success') {
                    loadStudents();
                } else {
                    alert(response.message);
                }
            }, 'json');
        }
    });
    
    $(document).on('click', '.btn-edit', function () {
        $("#modalEditStudent").modal("show");
        
        let fn = $(this).attr("attr-fn");
        let ln = $(this).attr("attr-ln");
        let db = $(this).attr("attr-dob");
        let em = $(this).attr("attr-em");
        let cl = $(this).attr("attr-cl");
        let gn = $(this).attr("attr-gn");
        let id = $(this).attr("attr-id");
        
        $("#editfirstName").val(fn);
        $("#editlastName").val(ln);
        $("#editdob").val(db);
        $("#editemail").val(em);
        $("#editclassInput").val(cl);
        $("#editgender").val(gn);
        $("#editIdStudent").val(id)
         });

    $('#btnRefresh').on('click', function () {
        loadStudents();
    });
});

function updateStudent() {
    let formData = $("#formEditStudent").serialize() + "&opt-5";
    
    $.post(phpurl, formData, function(server_response){
        let res = JSON.parse(server_response);
        if(res.success == 1){
            $("#modalEditStudent").modal("hide");
            loadStudents();
        }else{
            alert("Fuck you, this is ass!");
        }
    });
}

function makeToast( text = "Hello ma Nigga"){
    $.swipeToast({
       message: text,
       type: 'info', // 'default', 'success', 'error', 'warning', 'info'
       duration: 6000, // Duration in milliseconds
       position: 'top-center'
});
    
}

function makeToastGreen( text = "Hello ta Nigga"){
    $.swipeToast({
       message: text,
       type: 'success', // 'default', 'success', 'error', 'warning', 'info'
       duration: 6000, // Duration in milliseconds
       position: 'top-center'
});
    
}

function makeToastRed( text = "Hello mr Nigga"){
    $.swipeToast({
       message: text,
       type: 'warning', // 'default', 'success', 'error', 'warning', 'info'
       duration: 6000, // Duration in milliseconds
       position: 'top-center'
});
    
}

const table = new DataTable('#myTable', {
	// Configuration options
});













