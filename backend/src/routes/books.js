const express = require('express');
const router = express.Router();
const { authenticateUser, requireRole } = require('../middleware/auth');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

/**
 * 📦 BOOKS INVENTORY CONTROLLER
 * Comprehensive lifecycle management for the library catalog.
 */

// GET all books (Searchable)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// CREATE book (Admin/Librarian ONLY)
router.post('/', authenticateUser, requireRole(['admin', 'librarian']), async (req, res) => {
  const { title, author, isbn, category, language, total_copies, available_copies, description, imageUrl, publishDate } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('books')
      .insert({
        title,
        author,
        isbn,
        category,
        language,
        total_copies,
        available_copies,
        description,
        image_url: imageUrl,
        publish_date: publishDate
      })
      .select()
      .single();
      
    if (error) throw error;
    res.status(201).json({ success: true, message: 'Volume registered in system', data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE book
router.delete('/:id', authenticateUser, requireRole(['admin']), async (req, res) => {
  try {
    const { error } = await supabase.from('books').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true, message: 'Volume removed from inventory' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
