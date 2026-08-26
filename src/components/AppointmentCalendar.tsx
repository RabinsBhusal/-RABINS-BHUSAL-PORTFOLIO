import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  User,
  Mail,
  Building,
  CheckCircle,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Globe
} from 'lucide-react';

interface MeetingType {
  id: string;
  name: string;
  duration: string;
  description: string;
  color: string;
}

const MEETING_TYPES: MeetingType[] = [
  {
    id: 'intro',
    name: '15-Min Quick Intro',
    duration: '15 mins',
    description: 'Initial greeting, career fit evaluation, or short recruitment query.',
    color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
  },
  {
    id: 'interview',
    name: '30-Min In-Depth Chat',
    duration: '30 mins',
    description: 'Detailed interview, system requirements review, or project briefing.',
    color: 'border-sky-500 text-sky-400 bg-sky-500/10'
  },
  {
    id: 'advisory',
    name: '45-Min Finance consultation',
    duration: '45 mins',
    description: 'Financial modeling workbook showcase, ERP advisory, or technical deep-dive.',
    color: 'border-purple-500 text-purple-400 bg-purple-500/10'
  }
];

export const AppointmentCalendar: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1); // 1: Select Type, Date & Time, 2: Details & Confirmed
  const [selectedType, setSelectedType] = useState<MeetingType>(MEETING_TYPES[0]);
  
  // Calendar dates setup (Generate current and next 14 days)
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    const today = new Date();
    // Default to tomorrow or next weekday if today is weekend
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    while (tomorrow.getDay() === 0 || tomorrow.getDay() === 6) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    return tomorrow;
  });
  
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  
  // Form Details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    notes: ''
  });

  // Time Slots
  const TIME_SLOTS = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM'
  ];

  // Helper: Month name
  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Helper: Days in month grid
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days: (Date | null)[] = [];
    // Pad with nulls for first week offset
    // Adjusting firstDay so Mon is index 0
    const adjustedOffset = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < adjustedOffset; i++) {
      days.push(null);
    }
    
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(year, month, d));
    }
    
    return days;
  };

  const daysGrid = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (date: Date) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    if (date >= today && date.getDay() !== 0 && date.getDay() !== 6) {
      setSelectedDate(date);
    }
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  // Generate Google Calendar Link
  const getGoogleCalendarLink = () => {
    if (!selectedDate) return '';
    const dateStr = selectedDate.toISOString().split('T')[0].replace(/-/g, '');
    const startTimeStr = selectedTime.includes('AM') 
      ? selectedTime.replace(' AM', '').padStart(5, '0').replace(':', '') + '00'
      : (parseInt(selectedTime.replace(' PM', '').split(':')[0]) + 12).toString() + selectedTime.split(':')[1].replace(' PM', '') + '00';
    
    const startHour = selectedTime.includes('AM') 
      ? parseInt(selectedTime.split(':')[0]) 
      : parseInt(selectedTime.split(':')[0]) + 12;
    const startMin = parseInt(selectedTime.split(':')[1]);
    
    const startDate = new Date(selectedDate);
    startDate.setHours(startHour, startMin, 0);
    const endDate = new Date(startDate.getTime() + (selectedType.id === 'intro' ? 15 : selectedType.id === 'interview' ? 30 : 45) * 60 * 1000);
    
    const formatGCalDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const title = encodeURIComponent(`${selectedType.name} with Rabins Bhusal`);
    const details = encodeURIComponent(`Meeting scheduled via Rabins Bhusal Portfolio.\n\nType: ${selectedType.name}\nName: ${formData.name}\nCompany: ${formData.company || 'Not Specified'}\nNotes: ${formData.notes || 'No additional notes.'}`);
    const dates = `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`;
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&sf=true&output=xml`;
  };

  // Generate .ics invitation file download
  const handleDownloadICS = () => {
    if (!selectedDate) return;
    
    const startHour = selectedTime.includes('AM') 
      ? parseInt(selectedTime.split(':')[0]) 
      : parseInt(selectedTime.split(':')[0]) + 12;
    const startMin = parseInt(selectedTime.split(':')[1]);
    
    const startDate = new Date(selectedDate);
    startDate.setHours(startHour, startMin, 0);
    const endDate = new Date(startDate.getTime() + (selectedType.id === 'intro' ? 15 : selectedType.id === 'interview' ? 30 : 45) * 60 * 1000);

    const formatICSDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Rabins Bhusal Portfolio Booking//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@rabinsbhusal.com`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${selectedType.name} - Rabins Bhusal`,
      `DESCRIPTION:Scheduled meeting with Rabins Bhusal.\\n\\nClient: ${formData.name}\\nCompany: ${formData.company}\\nNotes: ${formData.notes}`,
      'LOCATION:Google Meet / Video Call',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Rabins_Meeting_${selectedDate.toISOString().split('T')[0]}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isTodayOrFutureWeekday = (date: Date) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    return date >= today && date.getDay() !== 0 && date.getDay() !== 6;
  };

  return (
    <div className="rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6 sm:p-8">
      {!bookingConfirmed ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-neutral-800">
            <div>
              <h3 className="text-xl font-display font-bold text-neutral-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span>Instantly Book an Appointment</span>
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                Secure a slot directly in my calendar for recruitment, consulting, or general finance discussions.
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-400">
              <Globe className="w-3.5 h-3.5 text-neutral-500" />
              <span>London, UK (BST/GMT)</span>
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              {/* Step 1: Select Meeting Type */}
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2.5">
                  1. Choose Meeting Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {MEETING_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type)}
                      className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        selectedType.id === type.id
                          ? 'bg-neutral-950 border-emerald-500/80 shadow-md shadow-emerald-500/10'
                          : 'bg-neutral-950/40 border-neutral-800/80 hover:border-neutral-700'
                      }`}
                    >
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase mb-2 ${type.color}`}>
                        {type.duration}
                      </span>
                      <h4 className="text-sm font-display font-bold text-neutral-200 mb-1 group-hover:text-emerald-400 transition-colors">
                        {type.name}
                      </h4>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">
                        {type.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Date and Time Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Date Grid */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      2. Select Date
                    </label>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handlePrevMonth}
                        className="p-1 rounded bg-neutral-950 hover:bg-neutral-800 text-neutral-400 transition-colors border border-neutral-800"
                        title="Previous Month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-mono text-neutral-300 px-2 font-semibold">
                        {getMonthName(currentDate)}
                      </span>
                      <button
                        onClick={handleNextMonth}
                        className="p-1 rounded bg-neutral-950 hover:bg-neutral-800 text-neutral-400 transition-colors border border-neutral-800"
                        title="Next Month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-4">
                    {/* Calendar Grid Header */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-neutral-500 font-bold mb-2">
                      <span>MON</span>
                      <span>TUE</span>
                      <span>WED</span>
                      <span>THU</span>
                      <span>FRI</span>
                      <span className="text-red-900/60">SAT</span>
                      <span className="text-red-900/60">SUN</span>
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                      {daysGrid.map((day, idx) => {
                        if (!day) return <div key={`empty-${idx}`} />;
                        
                        const isSelected = selectedDate && selectedDate.toDateString() === day.toDateString();
                        const isAvailable = isTodayOrFutureWeekday(day);
                        
                        return (
                          <button
                            key={day.toISOString()}
                            disabled={!isAvailable}
                            onClick={() => handleDateSelect(day)}
                            className={`aspect-square rounded-xl text-xs font-mono flex items-center justify-center transition-all ${
                              isSelected
                                ? 'bg-emerald-500 text-neutral-950 font-bold scale-105'
                                : isAvailable
                                ? 'text-neutral-200 bg-neutral-900 hover:bg-neutral-800 hover:scale-105 cursor-pointer'
                                : 'text-neutral-600 bg-neutral-950/20 opacity-30 cursor-not-allowed'
                            }`}
                          >
                            {day.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="lg:col-span-5 space-y-3">
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    3. Select Time Slot
                  </label>
                  <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-4 h-[234px] overflow-y-auto scrollbar-thin">
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-2">
                        {TIME_SLOTS.map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 px-3 rounded-xl text-xs font-mono text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-500 text-neutral-950 font-bold border border-emerald-400'
                                  : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <CalendarIcon className="w-6 h-6 text-neutral-600 mb-2" />
                        <p className="text-[11px] text-neutral-500 font-sans">
                          Select a date on the calendar first to view available slots.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedDate || !selectedTime}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs font-mono transition-all disabled:opacity-50 disabled:pointer-events-none shadow-md cursor-pointer"
                >
                  Continue to Details →
                </button>
              </div>
            </div>
          ) : (
            /* Step 2: Contact Details Form */
            <form onSubmit={handleBook} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Your Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                  Organisation / Firm (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                    <Building className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. KPMG / NHS / UEL"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                  Inquiry Focus / Objective
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share details or context for our conversation..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              {/* Selected Slot Recap */}
              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Video className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 block">SELECTED APPOINTMENT SLOT</span>
                    <span className="text-xs text-neutral-200 font-mono font-semibold">
                      {selectedDate?.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} at {selectedTime}
                    </span>
                  </div>
                </div>
                <div className="text-xs font-mono text-neutral-400">
                  {selectedType.name}
                </div>
              </div>

              <div className="pt-2 flex justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs font-mono transition-colors cursor-pointer"
                >
                  ← Go Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs font-mono transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  Confirm Appointment Booking
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        /* Booking Confirmation State */
        <div className="text-center py-6 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-display font-bold text-neutral-100">
              Appointment Reserved!
            </h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto">
              Your meeting request is fully registered. Check your email for confirmational details from Rabins Bhusal shortly.
            </p>
          </div>

          {/* Details Card */}
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-left space-y-3 font-mono text-xs">
            <div className="flex justify-between pb-2 border-b border-neutral-800">
              <span className="text-neutral-500">MEETING TYPE</span>
              <span className="text-neutral-200 font-semibold">{selectedType.name}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-neutral-800">
              <span className="text-neutral-500">DATE</span>
              <span className="text-neutral-200 font-semibold">
                {selectedDate?.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-neutral-800">
              <span className="text-neutral-500">TIME SLOT</span>
              <span className="text-neutral-200 font-semibold">{selectedTime} (BST / GMT)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">GUEST</span>
              <span className="text-neutral-200 font-semibold">{formData.name}</span>
            </div>
          </div>

          {/* Actions to Save */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4">
            <button
              onClick={handleDownloadICS}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono transition-colors cursor-pointer border border-neutral-700"
            >
              <Download className="w-4 h-4" />
              <span>Download .ics Calendar</span>
            </button>

            <a
              href={getGoogleCalendarLink()}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs font-mono transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Add to Google Calendar</span>
            </a>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setBookingConfirmed(false);
                setStep(1);
                setFormData({ name: '', email: '', company: '', notes: '' });
              }}
              className="text-xs text-neutral-500 hover:text-emerald-400 transition-colors font-mono cursor-pointer"
            >
              Book Another Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
