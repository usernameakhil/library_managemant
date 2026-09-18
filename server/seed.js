import store from './data/store.js';

const seedDB = () => {
  console.log('Resetting in-memory store with hardcoded sample library data...');
  store.reset();
  const stats = store.getDashboardStats();
  console.log('--- Hardcoded Data Summary ---');
  console.log(`Total Book Titles : ${stats.totalBookTitles}`);
  console.log(`Total Book Copies : ${stats.totalCopies}`);
  console.log(`Available Copies  : ${stats.availableCopies}`);
  console.log(`Total Members     : ${stats.totalMembers}`);
  console.log(`Active Loans      : ${stats.issuedBooks}`);
  console.log(`Returned Loans    : ${stats.returnedBooks}`);
  console.log('------------------------------');
  console.log('Seeding Complete! No MongoDB required.');
};

seedDB();
