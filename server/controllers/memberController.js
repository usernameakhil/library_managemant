import store from '../data/store.js';

// @desc    Get all members
// @route   GET /api/members
// @access  Public
export const getMembers = async (req, res) => {
  try {
    const members = store.getMembers();
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
    const member = store.getMemberById(req.params.id);
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
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Member name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please fill a valid email address' });
    }

    // Check if email already exists
    const emailExists = store.findMemberByEmail(email);
    if (emailExists) {
      return res.status(400).json({ message: 'Member with this email already exists' });
    }

    const createdMember = store.createMember({
      name,
      email,
      phone,
    });

    res.status(201).json(createdMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a member
// @route   PUT /api/members/:id
// @access  Public
export const updateMember = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const member = store.getMemberById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Check if email is taken by another member
    if (email && email.toLowerCase().trim() !== member.email.toLowerCase().trim()) {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please fill a valid email address' });
      }

      const emailExists = store.findMemberByEmail(email);
      if (emailExists && emailExists._id !== req.params.id) {
        return res.status(400).json({ message: 'Member with this email already exists' });
      }
    }

    const updatedMember = store.updateMember(req.params.id, {
      name,
      email,
      phone,
    });

    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a member
// @route   DELETE /api/members/:id
// @access  Public
export const deleteMember = async (req, res) => {
  try {
    const member = store.getMemberById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Check if member has any outstanding issued books
    if (store.hasActiveTransactionForMember(req.params.id)) {
      return res.status(400).json({
        message: 'Cannot delete member. They currently have issued books that need to be returned.',
      });
    }

    store.deleteMember(req.params.id);
    res.json({ message: 'Member and their transaction history deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
