// Database configuration
// In Hardcoded Mode, MongoDB is not needed.
export const connectDB = async () => {
  console.log('MongoDB connection skipped: Running with hardcoded in-memory store.');
};

export default connectDB;
