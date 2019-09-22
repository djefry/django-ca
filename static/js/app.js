$.ajax({
    url: '/rooms/list',
    type: 'get',
    dataType: 'json',
    success: function (data) {
        let rows = '';
        data.rooms.forEach(room => {
            rows += `
        <tr>
            <td>${room.room_number}</td>
            <td>${room.name}</td>
            <td>${room.nobeds}</td>
            <td>${room.room_type}</td>
            <td>
                <a class="badge badge-danger" data-id="${room.id}">Delete</a> <a class="badge badge-warning" data-id="${room.id}">Update</a> 
            </td>
        </tr>`;
        });
        $('#myTable').append(rows);
        $('.deleteBtn').each((i, elm) => {
            $(elm).on("click", (e) => {
                deleteRoom($(elm))
            })
        })
    }
});

function deleteRoom(el) {
    roomId = $(el).data('id')
    $.ajax({
        url: `/rooms/delete/${roomId}`,
        type: 'post',
        dataType: 'json',
        success: function (data) {
            $(el).parents()[1].remove()
        }
    });
}