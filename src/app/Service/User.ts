export class UserDashboardComponent {
  todayDate: string = new Date().toISOString().split('T')[0];
 empId: number = Number(sessionStorage.getItem('empId'));
  empName: string = sessionStorage.getItem('empName') || '';
}
