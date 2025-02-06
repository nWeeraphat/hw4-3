// ฟังก์ชันบันทึกนัดหมายลง Local Storage
function saveAppointment(appointment) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    loadAppointments();
}

// ฟังก์ชันโหลดนัดหมายจาก Local Storage
function loadAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const appointmentList = document.getElementById("appointmentList");
    appointmentList.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    const upcomingAppointments = appointments.filter(appointment => appointment.date >= today);

    upcomingAppointments.forEach(appointment => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="border p-2">${appointment.date}</td>
            <td class="border p-2">${appointment.startTime} - ${appointment.endTime}</td>
            <td class="border p-2">${appointment.title}</td>
            <td class="border p-2 ${appointment.status === "cancelled" ? "line-through text-red-500" : ""}">
                ${appointment.status}
            </td>
            <td class="border p-2 text-center">
                <button class="bg-red-500 text-white px-2 py-1 rounded cancel-btn" data-id="${appointment.id}">
                    ยกเลิก
                </button>
            </td>
        `;

        appointmentList.appendChild(row);
    });

    document.querySelectorAll(".cancel-btn").forEach(button => {
        button.addEventListener("click", function () {
            cancelAppointment(this.dataset.id);
        });
    });
}

// ฟังก์ชันยกเลิกนัดหมาย
function cancelAppointment(appointmentId) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments = appointments.map(appointment => 
        appointment.id === appointmentId ? { ...appointment, status: "cancelled" } : appointment
    );
    localStorage.setItem("appointments", JSON.stringify(appointments));
    loadAppointments();
}

// โหลดตารางนัดหมายเมื่อเปิดหน้าเว็บ
document.addEventListener("DOMContentLoaded", loadAppointments);
