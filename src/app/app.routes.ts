import { Routes } from '@angular/router';
import { UserDashboard } from './user-dashboard/user-dashboard';
import { Admin } from './Admin-Dashboard/admin/admin';
import { Login } from './login/login';
import { Employee } from './Admin-Dashboard/employee/employee';
import { AddEmployee } from './Admin-Dashboard/employee/add-employee/add-employee';
import { Projects } from './Admin-Dashboard/projects/projects';
import { AddProjects } from './Admin-Dashboard/projects/add-projects/add-projects';
import { EditProjects } from './Admin-Dashboard/projects/edit-projects/edit-projects';
import { Role } from './Admin-Dashboard/role/role';
import { AddRole } from './Admin-Dashboard/role/add-role/add-role';
import { EditRole } from './Admin-Dashboard/role/edit-role/edit-role';
import { Client } from './Admin-Dashboard/client/client';
import { Functions } from './Admin-Dashboard/functions/functions';
import { AddFuntion } from './Admin-Dashboard/functions/add-funtion/add-funtion';
import { EditFuntion } from './Admin-Dashboard/functions/edit-funtion/edit-funtion';
import { EditModule } from './Admin-Dashboard/modules/edit-module/edit-module';
import { AddModule } from './Admin-Dashboard/modules/add-module/add-module';
import { Modules } from './Admin-Dashboard/modules/modules';
import { TimeSlot } from './Admin-Dashboard/time-slot/time-slot';
import { AddTimeSlot } from './Admin-Dashboard/time-slot/add-time-slot/add-time-slot';
import { EditTimeSlot } from './Admin-Dashboard/time-slot/edit-time-slot/edit-time-slot';
import { Timesheet } from './Admin-Dashboard/timesheet/timesheet';
import { AddClient } from './Admin-Dashboard/client/add-client/add-client';
import { EditClient } from './Admin-Dashboard/client/edit-client/edit-client';

export const routes: Routes = [
    {path:'' , component:Login},
    {path : 'user-dashboard', component:UserDashboard}, 
    {path : 'admin',component:Admin,
         children: [
            // Employees
            { path: 'employees', component: Employee },
            { path: 'employees/add', component: AddEmployee },

            // Projects
            { path: 'projects', component: Projects },
            { path: 'projects/add', component: AddProjects },
            { path: 'projects/edit/:id', component: EditProjects },

            // Roles
            { path: 'roles', component: Role },
            { path: 'roles/add', component: AddRole },
            { path: 'roles/edit/:id', component: EditRole },

            // Clients
            { path: 'clients', component: Client },
            { path: 'clients/add', component: AddClient },
            { path: 'clients/edit/:id', component:EditClient  },

            // functions
            { path: 'functions', component: Functions },
            { path: 'functions/add', component: AddFuntion },
            { path: 'functions/edit/:id', component: EditFuntion },

            // Modules
            { path: 'modules', component: Modules },
            { path: 'modules/add', component: AddModule },
            { path: 'modules/edit/:id', component: EditModule },

            // Timeslots
            { path: 'timeslots', component: TimeSlot },
            { path: 'timeslots/add', component: AddTimeSlot },
            { path: 'timeslots/edit-timeslot/:id', component: EditTimeSlot },

            // Timesheets
            { path: 'timesheets', component: Timesheet },

            { path: '', redirectTo: 'employees', pathMatch: 'full' }
        ]
    }
];
