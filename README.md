# 🏥 Hospital Appointment Management UI (Angular)

A simple and interactive **Angular 17** front-end for managing hospital appointments, integrated with:

- ✅ Bootstrap 5
- ✅ Modal forms for Add/Edit
- ✅ Reactive forms with validation
- ✅ Toast notifications
- ✅ REST API integration

## 📦 Tech Stack

- Angular 17.3.17
- Bootstrap 5
- TypeScript
- RxJS
- Reactive Forms

## 🚀 Getting Started

1. Clone the project

```bash
git clone https://github.com/Seema2211/HospitalManagmentUI.git
cd hospital-appointments-ui
```

2. Install dependencies
```bash
npm install
```
3. Run the app
```bash
ng serve -o
```

http://localhost:4200



## 🧩 Features
📅 View, Add, Edit, and Delete appointments

📝 Form validation with required field messages

🔁 No overlapping appointments allowed (validated via API)

🪟 Bootstrap modal for better UX

🔔 Toast messages for feedback


```base
app/
└── appointments/
    ├── appointments.component.ts      // logic + API calls
    ├── appointments.component.html    // Bootstrap UI + modal
    └── appointments.component.css     // optional styles
```


| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | `/api/appointments`     |
| GET    | `/api/appointments/:id` |
| POST   | `/api/appointments`     |
| PUT    | `/api/appointments/:id` |
| DELETE | `/api/appointments/:id` |



## 🧠 Form Validation
All fields required: PatientName, DoctorName, Date, Time

Displays validation errors beneath fields

Form won't submit if invalid

🔔 Toast Notifications
Success messages after each action

Auto-dismiss after 3 seconds
