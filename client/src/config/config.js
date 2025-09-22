const domain = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://libro-backend.vercel.app";

console.log(`Domain: ${domain}`);

const config = {
  url: domain,
  authorization: `${domain}/api/members/authorization`,
  login: `${domain}/api/members/login`,
  members: `${domain}/api/members`,
  pollsCreate: `${domain}/api/polls/create`,
  pollsVote: (pollUrl) => `${domain}/api/polls/${pollUrl}/vote`,
  polls: (pollUrl) => `${domain}/api/polls/${pollUrl}`,
  allUserPolls: `${domain}/api/polls`,
  bookings: `${domain}/api/bookings`,
  bookingById: (bookingId) => `${domain}/api/bookings/${bookingId}`,
  bookingByUrl: (url) => `${domain}/api/bookings/url/${url}`,
  bookingsByMember: `${domain}/api/bookings/member`,
  bookingRequest: `${domain}/api/bookings/request`,
  appointments: `${domain}/api/appointments`,
  appointmentsByBookingId: (bookingId) => `${domain}/api/appointments/get/${bookingId}`,
  appointmentsByHour: (bookingId, hour) => `${domain}/api/appointments/get/${bookingId}/${hour}`,
  appointmentsByStudentCode: (studentCode) => `${domain}/api/appointments/student/${studentCode}`,
  reserveAppointment: (appId) => `${domain}/api/appointments/reserve/${appId}`,
  appointmentCreate: (bookingId) => `${domain}/api/appointments/create/${bookingId}`,
};

export default config;
