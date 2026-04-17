import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ message: "Title and body required" });
    }

    const note = await Note.create({
      userId: req.user.id,
      title,
      body,
    });

    res.status(201).json(note);
  } catch (err) {
    console.error("CREATE NOTE ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNotes = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    let query = {
      userId: req.user.id,
      isDeleted: false,
    };

    if (search) {
      query.$text = { $search: search };
    }

    const notes = await Note.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(notes);
  } catch (err) {
    console.error("GET NOTES ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
        isDeleted: false,
      },
      req.body,
      { new: true },
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (err) {
    console.error("UPDATE ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
        isDeleted: false,
      },
      { isDeleted: true },
      { new: true },
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.id,
      isDeleted: false,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isFavorite = !note.isFavorite;
    await note.save();

    res.json(note);
  } catch (err) {
    console.error("FAVORITE TOGGLE ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleArchive = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.id,
      isDeleted: false,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isArchived = !note.isArchived;
    await note.save();

    res.json(note);
  } catch (err) {
    console.error("ARCHIVE TOGGLE ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
