import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar-component/navbar-component';
import { Encryption } from '../Service/encryption';
import {
  ProjectList,
  TimeSlotList,
  timeSheetData,
  UserServices
} from '../Service/user-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule,NavbarComponent],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard implements OnInit {
  
 readonly MAX_SLOT_MINUTES = 59;

  selectedFunctionId: number | null = null;
  savedTimesheets: any[] = [];
  selectedGlobalSlotId: number | null = null;

  timeSheetData: any[] = [];    // ✅ FIX: Add this line

  durationOptions: number[] = Array.from({ length: 60 }, (_, i) => i + 1);

  user: any;
  project: ProjectList[] = [];
  timeSlot: TimeSlotList[] = [];
  minuteOptions: number[] = [];
  functionModules: any[] = [];
  filledSlots: { [slotId: number]: { filledMinutes: number, lastEndTime: string } } = {};
  loadingPrevious: boolean = false;
  approveClicked: boolean = false;
 todayDate : any = '';
 selectedDate : any = ''; 
  errorMessage: string | undefined;
  constructor(
    private route: Router,
    private encryptionService: Encryption,
    private userServices: UserServices,
    private cdRef: ChangeDetectorRef
  ) {
    console.log('Duration options:', this.durationOptions);

  }

  ngOnInit(): void {
    const encryptedUser = sessionStorage.getItem('user');
    if (encryptedUser) {
      this.user = this.encryptionService.decrypt(encryptedUser);
      console.log("User : ", this.user);
      this.filledSlots = {}; // Ensure this exists before using

      this.loadExistingTimesheets(this.user.empId);

      this.user.functions.forEach((fn: any) => {
        fn.selectedProjectId = null;
        fn.selectedSlotId = null;
        fn.selectedModuleId = null;

        fn.timeType = 'full';
        fn.selectedDuration = null; // Clear previous values        fn.timesheetDesc = '';
        this.loadModules(fn.fuN_ID);
        this.cdRef.detectChanges();
      });
      this.loadClientProjects();
      this.loadTimeSlots();
      this.cdRef.detectChanges();
    } else {
      this.route.navigate(['/']);

    }

  }

  loadModules(funId: number) {
    this.userServices.getModulesByFunctionId(funId).subscribe({
      next: (res) => {
        this.functionModules[funId] = res;
        this.cdRef.detectChanges();
      },
      error: () => {
        this.functionModules[funId] = [];
        this.cdRef.detectChanges();
      }
    });
  }

  onFunctionClick(fn: any) {
    this.selectedFunctionId = fn.fuN_ID;
  }

  loadExistingTimesheets(empId: number) {
    // this.loadingPrevious = true;
    this.loadingPrevious = false;

    this.userServices.getTimesheetsByEmployee(empId).subscribe({
      next: (res) => {
        this.timeSheetData = res;  // ✅ ADD THIS
        this.timeSheetData = res;
        res.forEach((entry: any) => {
          const slotId = entry.sloT_ID;
          const from = entry.timE_FROM;
          const to = entry.timE_TO;
          // const hours = parseFloat(entry.houRS); // fix: parseFloat
          const duration = this.getDurationInMinutes(entry.timE_FROM, entry.timE_TO); // get accurate used minutes

          if (!this.filledSlots[slotId]) {
            this.filledSlots[slotId] = { filledMinutes: 0, lastEndTime: '' };
          }

          this.filledSlots[slotId].filledMinutes += duration;

          if (
            !this.filledSlots[slotId].lastEndTime ||
            this.convertToMinutes(to) > this.convertToMinutes(this.filledSlots[slotId].lastEndTime)
          ) {
            this.filledSlots[slotId].lastEndTime = to;
          }
        });
        this.loadingPrevious = false;
      },
      error: (err) => {
        console.error('Failed to load previous timesheets:', err);
        this.loadingPrevious = false;
      }
    });
  }

  convertToMinutes(timeStr: string): number {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  }

  getDurationInMinutes(start: string, end: string): number {
    const [h1, m1] = start.split(':').map(Number);
    const [h2, m2] = end.split(':').map(Number);
    return (h2 * 60 + m2) - (h1 * 60 + m1);
  }

  loadClientProjects() {
    this.userServices.getClientProject().subscribe({
      next: (res) => (this.project = res),
      error: () => (this.project = [])
    });
  }
  

loadTimeSlots() {
  this.userServices.getTimeSlot().subscribe({
    next: (res) => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      // Filter slots based on current system time
      this.timeSlot = res.filter(slot => {
        const [from, to] = slot.timeslot.split('-').map((s: any) => s.trim());
        
        const from24 = this.convertTo24Hour(from);
        const to24 = this.convertTo24Hour(to);
        const fromMin = this.convertToMinutes(from24);
        const toMin = this.convertToMinutes(to24);

        // For morning hours (before 10:00 AM)
        if (currentHours < 10) {
          // Show all slots from 10:00 AM previous day to 10:00 AM current day
          return fromMin >= 600 || fromMin <= currentMinutes;
        }
        // For daytime hours (10:00 AM onwards)
        else {
          // Show slots from 10:00 AM up to current hour + 1
          const maxHour = currentHours ;
          const maxMin = maxHour * 60;
          return fromMin >= 600 && fromMin <= maxMin;
        }
      });

      console.log("Filtered Time Slots:", this.timeSlot);
      this.cdRef.detectChanges();
    },
    error: () => {
      this.timeSlot = [];
    }
  });
}



  onTimeSlotSelect(fn: any) {
    const slotId = fn.selectedSlotId;
    const info = this.filledSlots[slotId] || { filledMinutes: 0, lastEndTime: '' };

    if (this.approveClicked) {
      alert("✅ Timesheet already approved for today.");
      fn.selectedSlotId = null;
      return;
    }

    if (info.filledMinutes >= this.MAX_SLOT_MINUTES) {
      alert(`⛔ Slot ${slotId} is already fully submitted (${this.MAX_SLOT_MINUTES} minutes).`);
      fn.selectedSlotId = null;
      return;
    }

    fn.selectedDuration = null;
    fn.minuteOptions = [];

    if (fn.timeType === 'split') {
      this.updateSplitDurations(fn);
    }

    this.cdRef.detectChanges();
  }



  onTimeTypeChange(fn: any) {
    fn.selectedDuration = null;
    fn.minuteOptions = [];

    if (fn.timeType === 'split') {
      this.updateSplitDurations(fn);
    }
  }
  updateSplitDurations(fn: any) {
    const slotId = fn.selectedSlotId;
    if (!slotId) return;

    let savedUsed = 0;
    let localUsed = 0;

    if (this.savedTimesheets && Array.isArray(this.savedTimesheets)) {
      const savedForSlot = this.timeSheetData.filter((entry: any) =>
        entry.sloT_ID === slotId && entry.timE_TYPE === 'split'
      );
      savedUsed = savedForSlot.reduce((total: number, entry: any) => total + (entry.hourS * 60), 0);
    }

    const localForSlot = this.user.functions.filter((f: any) =>
      f !== fn &&
      f.timeType === 'split' &&
      f.selectedSlotId === slotId &&
      f.selectedDuration
    );
    localUsed = localForSlot.reduce((total: number, f: any) => total + f.selectedDuration, 0);

    const totalUsed = savedUsed + localUsed;
    const remaining = this.MAX_SLOT_MINUTES - totalUsed;

    fn.minuteOptions = [];
    if (remaining > 0) {
      for (let i = 1; i <= remaining; i++) {
        fn.minuteOptions.push(i);
      }
    }

    console.log("⏱️ [updateSplitDurations] Slot:", slotId, {
      savedUsed,
      localUsed,
      remaining
    });
  }

  getSlotLabel(slotId: number | null): string | null {
    if (slotId === null) return null;
    const slot = this.timeSlot.find(s => s.sloT_ID === slotId);
    return slot ? slot.timeslot : null;
  }

submitRow(fn: any) {
  fn.selectedSlotId = this.selectedGlobalSlotId;

  if (!this.selectedFunctionId) {
    alert("⛔ Please click the Function button before submitting.");
    return;
  }

  if (fn.fuN_ID !== this.selectedFunctionId) {
    alert("⛔ Please click the Function button of this row.");
    return;
  }

  fn.submitting = true;
  if (!fn || !this.filledSlots) {
    console.error('Invalid function or filledSlots data');
    return;
  }

  const slotId = fn.selectedSlotId;
  if (!slotId) {
    alert("⛔ Please select a time slot first");
    return;
  }

  const dbMinutes = this.getUsedSplitMinutes(fn);
  const thisDuration = fn.timeType === 'split' ? fn.selectedDuration || 0 : this.MAX_SLOT_MINUTES;

  if (!fn.selectedProjectId || !fn.selectedSlotId || !fn.selectedModuleId) {
    alert("⛔ Please select Project, Time Slot, and Module.");
    return;
  }

  if (fn.timeType === 'split' && !fn.selectedDuration) {
    alert("⛔ Please select duration for split time.");
    return;
  }

  if (dbMinutes + thisDuration > this.MAX_SLOT_MINUTES) {
    alert(`⛔ Cannot exceed ${this.MAX_SLOT_MINUTES} minutes.\nUsed: ${dbMinutes} min\nThis: ${thisDuration} min`);
    return;
  }

  const selectedSlotObj = this.timeSlot.find(slot => slot.sloT_ID === slotId);
  if (!selectedSlotObj) {
    alert("⛔ Invalid time slot selected");
    return;
  }

  const [fromStr, toStr] = selectedSlotObj.timeslot.split('-').map(t => t.trim());
  const startTime = this.convertTo24Hour(fromStr);
  const endTime = this.convertTo24Hour(toStr);
  let startDate = new Date(`1970-01-01T${startTime}`);
  let endDate: Date;

  let targetDate = new Date();
  const slotStartHour = parseInt(startTime.split(':')[0]);
  if (slotStartHour < 10) {
    targetDate.setDate(targetDate.getDate() - 1);
  }

  const formattedDate = `${targetDate.getFullYear()}-${(targetDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${targetDate.getDate().toString().padStart(2, '0')}`;

  // ⛔ Block full time entry if current time < slot end time (and it’s today)
  const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
  const isToday = formattedDate === today;
  if (fn.timeType === 'full' && isToday) {
    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();

    const slotStartMins = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
    const slotEndMins = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);

    const usedMins = nowMins - slotStartMins;

    if (nowMins < slotEndMins && usedMins < 60) {
      alert(`⛔ Only ${usedMins} minutes have passed in this slot.\nYou can't submit full 60 minutes.`);
      return;
    }
  }

  if (fn.timeType === 'split') {

    const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const slotStartMins = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
  const elapsedMins = nowMins - slotStartMins;
 if (isToday && elapsedMins < thisDuration) {
    alert(`⛔ Cannot submit ${thisDuration} minutes. Only ${elapsedMins} minutes have passed in this slot.`);
    return;
  }
    const slotInfo = this.filledSlots[slotId];
    if (slotInfo?.lastEndTime) {
      const [h, m] = slotInfo.lastEndTime.split(':').map(Number);
      startDate.setHours(h, m, 0, 0);
    } else {
      startDate = new Date(startDate.getTime() + dbMinutes * 60000);
    }
    endDate = new Date(startDate.getTime() + thisDuration * 60000);
  } else {
    endDate = new Date(`1970-01-01T${endTime}`);
  }

  const timeFrom = startDate.toTimeString().slice(0, 5);
  const timeTo = endDate.toTimeString().slice(0, 5);

  const timesheet: timeSheetData = {
    emP_ID: this.user.empId,
    sloT_ID: slotId,
    hours: fn.timeType === 'full' ? 1 : 2,
    proJ_ID: fn.selectedProjectId,
    fuN_ID: fn.fuN_ID,
    moD_ID: fn.selectedModuleId,
    timE_FROM: timeFrom,
    timE_TO: timeTo,
    timesheeT_DESC: fn.timesheetDesc?.trim() || 'N/A',
    createD_BY: this.user.empEmail || 'System',
    timesheeT_DATE: formattedDate
  };

  this.userServices.postTimeSheet(timesheet).subscribe({
    next: () => {
      alert('✅ Timesheet submitted');
      if (this.filledSlots[slotId]) {
        this.filledSlots[slotId].filledMinutes += thisDuration;
        this.filledSlots[slotId].lastEndTime = timeTo;
      } else {
        this.filledSlots[slotId] = {
          filledMinutes: thisDuration,
          lastEndTime: timeTo
        };
      }
      fn.selectedProjectId = null;
      fn.selectedSlotId = null;
      fn.selectedModuleId = null;
      fn.selectedDuration = null;
      fn.timeType = 'full';
      fn.timesheetDesc = '';
      this.cdRef.detectChanges();
      this.loadExistingTimesheets(this.user.empId);
    },
    error: (err: any) => {
      this.errorMessage = err.error || 'Failed to submit timesheet';
    }
  });
}



  convertTo24Hour(time: string): string {
    const [t, modifier] = time.split(' ');
    let [hours, minutes] = t.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  getUsedSplitMinutes(fn: any): number {
  const selectedSlotId = this.selectedGlobalSlotId;
  if (!selectedSlotId) return 0;

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0]; // e.g., "2025-07-29"
  const isAfter10AM = now.getHours() >= 10;

  
  // Debug: Show today's string and time context
  console.log('Today:', todayStr, 'Is after 10AM?', isAfter10AM);
  // 1. Get saved minutes from DB (like getSavedSlotMinutes)
  const savedUsed = this.timeSheetData
    .filter(t =>
      t.sloT_ID === selectedSlotId &&
      (
        // Show all entries if before 10AM (including yesterday’s)
        !isAfter10AM ||
        // After 10AM → only today's entries
        t.timesheeT_DATE?.split('T')[0] === todayStr
          
      )
    )
    .reduce((sum, t) => {
      const minutesUsed = this.getDurationInMinutes(t.timE_FROM, t.timE_TO);
      return sum + minutesUsed;
    }, 0);

  // 2. Get local (unsaved) minutes from screen (excluding current function)
  const localUsed = this.user.functions
    .filter((f: any) =>
      f !== fn &&
      f.selectedSlotId === selectedSlotId &&
      f.timeType === 'split' &&
      f.selectedDuration
    )
    .reduce((sum: number, f: any) => sum + (f.selectedDuration || 0), 0);

  const totalUsed = savedUsed + localUsed;

  console.log('Used Split Minutes (Excluding current):', {
    slotId: fn.selectedSlotId,
    savedUsed,
    localUsed,
    totalUsed
  });

  return totalUsed;
}


  getUsedSplitMinutesBySlot(slotId: number): number {
    let used = 0;

    // Count saved entries (if any are fetched from DB)
    for (let fn of this.user.functions) {
      if (fn.selectedSlotId === slotId && fn.savedHours) {
        used += fn.savedHours * 60; // convert to minutes
      }
    }

    // Count unsaved entries
    for (let fn of this.user.functions) {
      if (fn.selectedSlotId === slotId && fn.timeType === 'split' && fn.selectedDuration) {
        used += fn.selectedDuration;
      }
    }

    return used;
  }



  getLocalUsedSplitMinutes(fn: any): number {
    return this.user.functions
      .filter((f: any) =>
        f !== fn &&
        f.selectedSlotId === fn.selectedSlotId &&
        f.timeType === 'split')
      .reduce((sum: number, f: any) => sum + (f.selectedDuration || 0), 0);
  }


  getDisplayUsedMinutes(fn: any): number {
    return this.getUsedSplitMinutes(fn);
  }

  getRemainingSlotMinutes(fn: any): number {
    const used = this.getUsedSplitMinutes(fn);
    const pending = fn.timeType === 'split' ? fn.selectedDuration || 0 : 0;
    return this.MAX_SLOT_MINUTES - (used + pending);
  }
  getAvailableSplitDurations(fn: any): number[] {
    // पहले से उपयोग किए गए मिनट (saved + in-memory) निकालें
    const used = this.getUsedSplitMinutes(fn);
    // 60 मिनट में से बचा हुआ समय निकालें
    const remaining = this.MAX_SLOT_MINUTES - used;
    // durationOptions में से वे वैल्यूज़ चुनें जो remaining से कम या बराबर हों
    return this.durationOptions.filter(m => m <= remaining);
  }


}