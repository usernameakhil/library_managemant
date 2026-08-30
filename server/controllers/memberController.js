import Member from '../models/Member.js';
import Transaction from '../models/Transaction.js';

// @desc    Get all members
// @route   GET /api/members
// @access  Public
export const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single member by ID
// @route   GET /api/members/:id
// @access  Public
export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a member
// @route   POST /api/members
// @access  Public
export const createMember = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    // Check if email already exists
    const emailExists = await Member.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Member with this email already exists' });
    }

    const member = new Member({
      name,
      email,
      phone,
    });

    const createdMember = await member.save();
    res.status(201).json(createdMember);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a member
// @route   PUT /api/members/:id
// @access  Public
export const updateMember = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Check if email is taken by another member
    if (email && email !== member.email) {
      const emailExists = await Member.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Member with this email already exists' });
      }
    }

    member.name = name || member.name;
    member.email = email || member.email;
    member.phone = phone || member.phone;

    const updatedMember = await member.save();
    res.json(updatedMember);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a member
// @route   DELETE /api/members/:id
// @access  Public
export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Check if member has any outstanding issued books
    const outstandingBooks = await Transaction.findOne({ memberId: req.params.id, status: 'Issued' });
    if (outstandingBooks) {
      return res.status(400).json({
        message: 'Cannot delete member. They currently have issued books that need to be returned.',
      });
    }

    // Delete member's transaction history
    await Transaction.deleteMany({ memberId: req.params.id });
    await Member.findByIdAndDelete(req.params.id);

    res.json({ message: 'Member and their transaction history deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
